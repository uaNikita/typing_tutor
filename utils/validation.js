export const requiredError = 'Please fill out this field';


export const validateField = (name, val) => {
  const errors = {};

  if (!val) {
    errors[name] = requiredError;
  }

  return errors;
};


export const validateEmail = (name, val) => {
  const errors = {
    ...validateField(name, val),
  };

  if (!errors[name]) {
    // eslint-disable-next-line no-useless-escape
    if (!/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(val)) {
      errors[name] = 'Please enter a valid email address';
    }
  }

  return errors;
};

validateEmail.existError = 'Email is already exist';
validateEmail.nonExistError = 'Email is not exist';

export const validatePassword = (name, val) => {
  const errors = {
    ...validateField(name, val),
  };

  if (!errors[name]) {
    if (val.length < 5) {
      errors[name] = 'Must have 5 or more characters';
    }
    else if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{5,}$/.test(val)) {
      errors[name] = 'Must contain one upper and lower letters, one number';
    }
  }

  return errors;
};
