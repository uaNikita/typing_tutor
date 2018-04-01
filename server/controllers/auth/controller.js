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
const Access = require('../../models/access');

const generateAccessToken = obj => jwt.sign(obj, config.get('secretKey'), { expiresIn: '1d' });

const generateTokenWithId = clientId => clientId.toString() + crypto.randomBytes(40).toString('hex');

const createClient = userId => {
  const client = new Client({
    user: userId,
  });

  client.token = generateTokenWithId(client.get('id'));

  const access = new Access({
    client: client.get('id'),
  });

  access.token = generateAccessToken({
    id: userId,
    clientId: client.get('id'),
  });

  return [client.save(), access.save()];
};

const login = (req, res, next) => {
  User.get(req.user.get('id'))
    .then(user => {
      if (!user.get('active')) {
        throw new APIError({
          message: 'Your account is not active',
          status: httpStatus.FORBIDDEN,
        });
      }

      return Promise.all([...createClient(user.get('id'))])
        .then(([client, access]) => {
          res.json({
            tokens: {
              refresh: client.get('token'),
              access: access.get('token'),
            },
            ...user.toObject(),
          });
        });
    })
    .catch(e => next(e));
};

const logout = (req, res, next) => {
  const {
    user: {
      clientId,
    },
  } = req;

  Client.get(clientId)
    .then(client => client.remove().exec())
    .then(() => Access.findByClient(clientId))
    .then(access => access.remove().exec())
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

  User.findOne({ 'email': email }).exec()
    .then(user => {
      if (user) {
        const verification = new Verification({
          user: user,
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
      else {
        throw new APIError({
          message: httpStatus['404'],
          status: httpStatus.NOT_FOUND,
        });
      }
    })
    .catch(e => next(e));
};

const restoreAccess = (req, res, next) => {
  const { email } = req.body;

  User.findOne({ 'email': email }).exec()
    .then(user => {
      if (user) {
        const password = getRandomPassword();

        user.set('newPassword', password);

        const verification = new Verification({
          user: user,
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
      else {
        throw new APIError({
          message: httpStatus['404'],
          status: httpStatus.NOT_FOUND,
        });
      }
    })
    .catch(e => next(e));
};

const getTokens = (req, res, next) => {
  const token = req.get('Authorization').replace('Bearer ', '');

  Client
    .findByToken(token)
    .then(client => {
      const clientToSave = client;

      clientToSave.token = generateTokenWithId(clientToSave.get('id'));

      return clientToSave.save()
        .then(() => Access.findByClient(clientToSave.get('id')))
        .then(access => {
          const accessToSave = access;

          accessToSave.token = generateAccessToken({
            id: clientToSave.get('user'),
            clientId: clientToSave.get('id'),
          });

          return accessToSave;
        })
        .catch(() => new Access({
          client: clientToSave.get('id'),
          token: generateAccessToken({
            id: clientToSave.get('user'),
            clientId: clientToSave.get('id'),
          }),
        }))
        .then(access => access.save())
        .then(access => {
          res.json({
            refresh: clientToSave.get('token'),
            access: access.get('token'),
          });
        });
    })
    .catch(e => next(e));
};

const checkEmail = (req, res, next) =>
  User.findOne({ 'email': req.body.email })
    .then(user => {
      let code = 404;

      if (user) {
        code = 200;
      }

      res.json(httpStatus[code]);
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

      return Promise.all([...createClient(user.get('id')), user.save(),
        // verification.remove().exec()
      ])
        .then(([client, access]) =>
          res.json({
            type,
            tokens: {
              refresh: client.get('token'),
              access: access.get('token'),
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
