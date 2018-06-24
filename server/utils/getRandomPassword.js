const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890';
const charsL = chars.length;

const getRandomPassword = () => {
  let pass = '';

  for (let i = 0; i < 7; i += 1) {
    pass += chars.charAt(Math.floor(Math.random() * charsL));
  }

  return pass;
};


const getValidRandomPassword = () => {
  let password = getRandomPassword();

  while (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{3,}$/.test(password)) {
    password = getRandomPassword();
  }

  return password;
};

module.exports = getValidRandomPassword;
