const nodemailer = require('nodemailer');
const config = require('config');

const transporter = (({ user, clientId, clientSecret, refreshToken }) => nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 465,
  secure: true,
  auth: {
    type: 'OAuth2',
    user,
    clientId,
    clientSecret,
    refreshToken,
  }
}))(config.get('mail'));

module.exports = transporter;