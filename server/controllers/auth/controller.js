const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const config = require('config');
const httpStatus = require('http-status');

const emailTemplates = require('../../email-templates');
const transporter = require('../../utils/transporter');
const getRandomPassword = require('../../utils/getRandomPassword');

const APIError = require('../../utils/APIError');
const User = require('../../models/user');
const Verification = require('../../models/verification');
const Client = require('../../models/client');

const generateAccessToken = obj => jwt.sign(obj, config.get('secretKey'), { expiresIn: '1d' });

const generateTokenWithId = clientId => clientId.toString() + crypto.randomBytes(40).toString('hex');

const createClient = userId => {
  const client = new Client({
    user: userId,
  });

  client.set('token', generateTokenWithId(client.get('id')));

  return client.save();
};

const login = (req, res) => {
  const {
    user,
  } = req;

  if (!user.get('active')) {
    throw new APIError({
      message: 'Your account is not active',
      status: httpStatus.FORBIDDEN,
    });
  }

  return createClient(user.get('id'))
    .then(client => {
      res.json({
        tokens: {
          refresh: client.get('token'),
          access: generateAccessToken({
            id: user.get('id'),
            clientId: client.get('id'),
          }),
        },
        ...user.toObject(),
      });
    });
};

const logout = (req, res, next) => {
  const {
    user: {
      clientId,
    },
  } = req;

  Client.get(clientId)
    .then(client => client.remove().exec())
    .then(() => res.json(httpStatus[200]))
    .catch(e => next(e));
};

const signUp = (req, res, next) => {
  const { email } = req.body;

  User.isNotExist(email)
    .then(() => {
      const password = getRandomPassword();

      const user = new User({
        email,
        password,
      });

      const verification = new Verification({
        user,
        type: 'email',
      });

      verification.token = verification.get('id') + crypto.randomBytes(40).toString('hex');

      return Promise.all([verification.save(), user.save()])
        .then(([verif]) => {
          const mailOptions = {
            from: config.get('mail.from'),
            to: email,
            subject: 'Acoount registration',
            html: emailTemplates.registration({
              origin: req.get('origin'),
              token: verif.get('token'),
              password,
            }),
          };

          transporter.sendMail(mailOptions, error => {
            if (error) {
              throw new APIError({
                message: 'We can not verify your email now. Please try again later.',
                status: httpStatus.SERVICE_UNAVAILABLE,
              });
            }

            res.json(httpStatus[200]);
          });
        });
    })

    .catch(e => next(e));
};

const verifyEmail = (req, res, next) => {
  const { email } = req.body;

  User.findOne({ email }).exec()
    .then(user => {
      if (user) {
        const verification = new Verification({
          user,
          type: 'email',
        });

        verification.set('token', verification.get('id') + crypto.randomBytes(40).toString('hex'));

        return verification.save()
          .then(verif => {
            const mailOptions = {
              from: config.get('mail.from'),
              to: email,
              subject: 'Email verification',
              html: emailTemplates.verifyEmail({
                origin: req.get('origin'),
                token: verif.get('token'),
              }),
            };

            transporter.sendMail(mailOptions, error => {
              if (error) {
                throw new APIError({
                  message: 'We can not verify your email now. Please try again later.',
                  status: httpStatus.SERVICE_UNAVAILABLE,
                });
              }

              res.json(httpStatus[200]);
            });
          });
      }

      throw new APIError({
        message: httpStatus['404'],
        status: httpStatus.NOT_FOUND,
      });
    })
    .catch(e => next(e));
};

const restoreAccess = (req, res, next) => {
  const { email } = req.body;

  User.findOne({ email }).exec()
    .then(user => {
      if (user) {
        const password = getRandomPassword();

        user.set('newPassword', password);

        const verification = new Verification({
          user,
          type: 'password',
        });

        verification.set('token', verification.get('id') + crypto.randomBytes(40).toString('hex'));

        return Promise.all([verification.save(), user.save()])
          .then(([verif]) => {
            const mailOptions = {
              from: config.get('mail.from'),
              to: email,
              subject: 'Restore access',
              html: emailTemplates.restoreAccess({
                origin: req.get('origin'),
                token: verif.get('token'),
                password,
              }),
            };

            transporter.sendMail(mailOptions, error => {
              if (error) {
                throw new APIError({
                  message: 'We can not verify your email now. Please try again later.',
                  status: httpStatus.SERVICE_UNAVAILABLE,
                });
              }

              res.json(httpStatus[200]);
            });
          });
      }

      throw new APIError({
        message: httpStatus['404'],
        status: httpStatus.NOT_FOUND,
      });
    })
    .catch(e => next(e));
};

const getTokens = (req, res, next) => {
  const token = req.get('Authorization').replace('Bearer ', '');

  Client.findOne({ token })
    .exec()
    .then(client => {
      if (client) {
        client.set('token', generateTokenWithId(client.get('id')));

        return client.save()
          .then(() =>
            res.json({
              refresh: client.get('token'),
              access: generateAccessToken({
                id: client.get('user'),
                clientId: client.get('id'),
              }),
            }));
      }

      throw new APIError({
        message: httpStatus['401'],
        status: httpStatus.UNAUTHORIZED,
      });
    })

    .catch(e => next(e));
};

const checkEmail = (req, res, next) =>
  User.findOne({ email: req.body.email })
    .then(user => {
      if (user) {
        res.json(httpStatus[200]);
      }
      else {
        throw new APIError({
          status: httpStatus.NOT_FOUND,
        });
      }
    })
    .catch(e => next(e));

const getUserData = (req, res, next) =>
  User.get(req.user.id)
    .then(user => res.json(user.toObject()))
    .catch(e => next(e));

const verifyToken = (req, res, next) =>
  Verification.findByToken(req.body.token)
    .then(verification => {
      const type = verification.get('type');
      const user = verification.get('user');

      switch (type) {
        case 'email':
          user.set('active', true);
          break;
        case 'password':
          user.set('password', user.get('newPassword'));
          user.set('newPassword', undefined);
          break;
      }

      return Promise.all([createClient(user.get('id')), user.save(),
        // verification.remove().exec()
      ]).then(([client]) =>
        res.json({
          type,
          tokens: {
            refresh: client.get('token'),
            access: generateAccessToken({
              id: user.get('id'),
              clientId: client.get('id'),
            }),
          },
          ...user.toObject(),
        }));
    })
    .catch(e => next(e));

module.exports = {
  signUp,
  verifyEmail,
  restoreAccess,
  login,
  logout,
  getTokens,
  checkEmail,
  getUserData,
  verifyToken,
};
