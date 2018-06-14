import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Field, reduxForm, SubmissionError } from 'redux-form/immutable';
import CSSModules from 'react-css-modules';

import { validateEmail, validatePassword } from 'Utils/validation';

import RenderField from 'Blocks/RenderField/component.jsx';
import Button from 'Blocks/Button/component.jsx';

import styles from './sign-in.module.styl';


class Block extends Component {
  state = {
    accountIsNotActive: false,
    submittedVerifyLink: false,
  };

  handleSubmit = values => {
    const {
      props: {
        history: {
          replace,
        },
        setAllWithAuth,
        fetchJSON,
        isModal,
        lastNoModalLocation,
      },
    } = this;

    this.email = values.get('email');

    return fetchJSON('/auth/login', {
      body: values.toJS(),
    })
      .then(res => {
        if (res.ok) {
          setAllWithAuth(res.data);

          if (isModal) {
            replace(lastNoModalLocation.pathname);
          }
          else {
            replace('/');
          }
        }
        else {
          if (res.status === 403) {
            this.setState({
              accountIsNotActive: true,
            });
          }

          if (res.data.errors) {
            throw new SubmissionError(res.data.errors);
          }
        }
      });
  };

  handleSendVerifyLink = () => {
    const {
      props: {
        fetchJSON,
      },
    } = this;

    fetchJSON('/auth/verify-email', {
      body: {
        email: this.email,
      },
    })
      .then(() => this.setState({
        submittedVerifyLink: true,
      }));
  };

  render() {
    const {
      handleSubmit,
      submitting,
      invalid,
    } = this.props;

    let content = (
      <form className="auth__form" onSubmit={handleSubmit(this.handleSubmit)}>
        <Field name="email" component={RenderField} type="email" label="Email" />

        <Field name="password" component={RenderField} type="password" label="Password" />

        <p className="auth__fp-wrap">
          <Link
            to="/restore-access"
            className="auth__fp">
            Restore access?
          </Link>
        </p>

        <Button type="submit" disabled={invalid} isLoader={submitting}>Log In</Button>

        <p className="auth__hint">
          Not yet registered? <Link to="/sign-up" className="auth__link1">Registration</Link>
        </p>
      </form>
    );

    if (this.state.submittedVerifyLink) {
      content = (
        <p>
          You’ve got mail, <br />
          Please click the link in the email we just sent you so we can verify your account.
        </p>
      );
    }
    else if (this.state.accountIsNotActive) {
      content = [
        <p key="email-not-verified">
          Your account email is not verified, <br />
          Please click the link bellow and we will send you a link to verify email.
        </p>,
        <button key="verify-link" className="button" onClick={this.handleSendVerifyLink}>Send verify link</button>,
      ];
    }

    return (
      <div className="auth" styleName="root">
        <h3 className="auth__title">Log In</h3>

        {content}
      </div>
    );
  }
}

const validate = values => ({
  ...validateEmail('email', values.get('email')),
  ...validatePassword('password', values.get('password')),
});

export default reduxForm({
  form: 'sign-in',
  validate,
  asyncBlurFields: ['email'],
})(CSSModules(Block, styles));
