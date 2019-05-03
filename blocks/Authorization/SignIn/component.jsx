import React, { Component, Fragment } from 'react';
import { withRouter, Link } from 'react-router-dom';
import { Field, reduxForm, SubmissionError } from 'redux-form/immutable';
import classNames from 'classnames';

import { validateEmail, validatePassword } from 'Utils/validation';
import RenderField from 'Blocks/RenderField/component';
import Button from 'Blocks/Button/component';

class Block extends Component {
  state = {
    accountIsNotActive: false,
    submittedVerifyLink: false,
  };

  handleSubmit = (values) => {
    const {
      props: {
        history: {
          replace,
        },
        setTokens,
        setData,
        init,
        clearAppData,
        fetchJSON,
      },
    } = this;

    this.email = values.get('email');

    return fetchJSON('/auth/login', {
      body: values.toJS(),
    })
      .then((res) => {
        if (res.ok) {
          const {
            refreshToken,
            accessToken,
            ...rest
          } = res.data;

          clearAppData();

          setData(rest);

          setTokens({
            refreshToken,
            accessToken,
            anonymousToken:null,
          });

          init();

          replace('/');
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
      props: {
        handleSubmit,
        submitting,
        invalid,
        className,
      },
      state: {
        submittedVerifyLink,
        accountIsNotActive,
      },
    } = this;

    let content = (
      <form className="auth__form" onSubmit={handleSubmit(this.handleSubmit)}>
        <Field className="auth__row" name="email" component={RenderField} type="email" label="Email" />

        <Field className="auth__row" name="password" component={RenderField} type="password" label="Password" />

        <p className="auth__fp-wrap">
          <Link
            to="/authorization/restore-access"
            className="auth__fp"
          >
            Restore access?
          </Link>
        </p>

        <Button type="submit" disabled={invalid} isLoader={submitting}>
          Log In
        </Button>

        <p className="auth__hint">
          Not yet registered?
          {' '}
          <Link to="/authorization/sign-up" className="auth__link1">
            Registration
          </Link>
        </p>
      </form>
    );

    if (submittedVerifyLink) {
      content = (
        <p>
          You’ve got mail,
          <br />
          Please click the link in the email we just sent you so we can verify your account.
        </p>
      );
    }
    else if (accountIsNotActive) {
      content = (
        <Fragment>
          <p>
            Your account email is not verified,
            <br />
            Please click the link bellow and we will send you a link to verify email.
          </p>
          <button type="button" className="button" onClick={this.handleSendVerifyLink}>
            Send verify link
          </button>
        </Fragment>
      );
    }

    return (
      <div className={classNames(className, 'auth')}>
        <h3 className="auth__title">
          Log In
        </h3>

        {content}
      </div>
    );
  }
}

const validate = values => ({
  ...validateEmail('email', values.get('email')),
  ...validatePassword('password', values.get('password')),
});

export default withRouter(
  reduxForm({
    form: 'sign-in',
    validate,
  })(Block),
);
