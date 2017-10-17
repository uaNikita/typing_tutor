// Regex
const email = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const name = /^[a-zA-Z\-' ]{0,255}$/;
const password = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{3,}$/;
// const accountNumber = /^(\d){7,9}$/;
// const pin = /^[0-9]{4}$/;
// const employeeId = /^[1-9][0-9]{0,3}$/;
// const landlinePhone = /^0[12358][0-9]{9}$/;
// const mobilePhone = /^07[0-9]{9}$/;
// const number = /[0-9]*/;
// const houseNumber = /^[0-9]+[a-z0-9\-]*$/i;
// const flatNumber = /^[a-z0-9\- ]+$/i;
// const alphaNumCharHyphen = /^[a-z0-9\- ]+$/i;
// const address = /[\w ]+$/;
// const addressLine = /^[a-z0-9\-@.` ]+$/i;
// const postCode = /^[a-z0-9\- ]{5,}$/i;
// const sortCode = /[0-9]{2}-[0-9]{2}-[0-9]{2}/;
// const accountName = /.{2,250}/;
// const dateMovedIn = /^\d{2}\/\d{4}$/;
// const dateOfBirth = /^\d{2}\/\d{2}\/\d{4}$/;


requiredError = 'Please fill out this field';

module.exports = {
  title: {
    required: 'Please select your title',
  },
  firstName: {
    required: 'Please tell us your first name',
    tooShort: 'Please tell us your full first name',
    forbidden: {
      regex: name,
      error: 'Only alphabetic characters, spaces, hyphens and apostrophes are allowed',
    },
  },
  lastName: {
    required: 'Please tell us your last name',
    tooShort: 'Please tell us your full last name',
    forbidden: {
      regex: name,
      error: 'Only alphabetic characters, spaces, hyphens and apostrophes are allowed',
    },
  },
  dateOfBirth: {
    tooYoung: 'You must be 18 or older to register',
  },
  dayDateOfBirth: {
    required: 'Please select a day',
  },
  monthDateOfBirth: {
    required: 'Please select a month',
  },
  yearDateOfBirth: {
    required: 'Please select a year',
  },
  email: {
    enter: 'Please enter your email address',
    required: 'Please tell us your email address',
    valid: {
      regex: email,
      error: 'Please enter a valid email address',
    },
    doNotMatch: 'The email addresses do not match',
    registered: 'You\'ve already registered with this email. Please provide an alternative',
    notFound: 'The email address you entered cannot be found. Please check and try again.',
    emailedInstructions: 'We’ve emailed you instructions on how to reset your password. Please check your inbox. If you don\'t get the email within a couple of minutes please email support@neyber.co.uk',
  },
  password: {
    enter: 'Please enter the password for your Neyber account',
    required: 'Please create a password',
    useHint: 'See hint indicators',
    tooShort: 'Must be more than 8 characters',
    valid: {
      regex: password,
      error: 'Must contain at least one upper letter, one lower letter and one number',
    },
  },
  termsAndConditions: {
    required: 'You must agree to our terms to proceed',
  },
  company: {
    required: 'Please tell us your company name',
  },
};
