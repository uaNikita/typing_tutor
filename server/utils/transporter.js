const nodemailer = require('nodemailer');
const config = require('config');

const { user, clientId, clientSecret, refreshToken } = config.get('mail');

const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 465,
  secure: true,
  auth: {
    type: 'OAuth2',
    user,
    clientId,
    clientSecret,
    refreshToken,
  },
});

module.exports = transporter;
