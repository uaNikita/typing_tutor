export const requiredError = 'Please fill out this field';

export const validateEmail = email => {
  const errors = {};

  if (!email) {
    errors.email = requiredError;
  }
  else if (!/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)) {
    errors.email = 'Please enter a valid email address';
  }

  return errors;
};

export const validatePassword = (name, val) => {
  const errors = {};

  if (!val) {
    errors[name] = requiredError;
  }
  else if (val.length < 5) {
    errors[name] = 'Must have 5 or more characters';
  }
  else if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{5,}$/.test(val)) {
    errors[name] = 'Must contain one upper and lower letters, one number';
  }

  return errors;
};
