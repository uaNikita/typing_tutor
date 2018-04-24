const { env } = process;

module.exports = {
  database: {
    host: env.dbhost,
    port: env.dbport,
    username: env.dbuser,
    password: env.dbpassword,
  },
  secretKey: env.secretkey,
  port: env.PORT,
};
