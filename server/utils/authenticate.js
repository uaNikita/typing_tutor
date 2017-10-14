const config = require('config');
const expressJwt = require('express-jwt');

const authenticate = expressJwt({
  secret: config.get('secretKey'),
});

module.exports = authenticate;