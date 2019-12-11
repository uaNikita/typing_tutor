import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm, SubmissionError } from 'redux-form/immutable';
import _ from 'lodash';

import { processSetSettings } from 'ReduxUtils/reducers/user';

import RenderField from 'Blocks/RenderField/component';

import { validateField } from 'Utils/validation';

export default ({ name, ...rest }) => {
  class Block extends Component {
    submit = values => {
      const {
        props: {
          setSettings,
          initialValues,
        },
      } = this;

      const settings = values.toJS();

      settings[name] = _.trim(settings[name]);

      let result = false;

      if (initialValues.get(name) !== settings[name]) {
        result = setSettings(settings)
          .then(res => {
            if (res.data && res.data.errors) {
              throw new SubmissionError(res.data.errors);
            }
          });
      }

      return result;
    };

    render() {
      const {
        props: {
          handleSubmit,
        },
        submit,
      } = this;

      const fieldProps = {
        name,
        onBlur: handleSubmit(submit),
        component: RenderField,
        loader: true,
        ...rest,
      };

      if (!fieldProps.label) {
        fieldProps.label = _.upperFirst(name);
      }

      return (
        <form onSubmit={handleSubmit(submit)}>
          <Field {...fieldProps} />
        </form>
      );
    }
  }

  const validate = values => ({
    ...validateField(name, values.get(name)),
  });

  const mapStateToProps = state => {
    const result = {
      initialValues: {},
    };

    result.initialValues[name] = state.getIn(['user', name]);

    return result;
  };

  const mapDispatchToProps = dispatch => ({
    setSettings: (...args) => dispatch(processSetSettings(...args)),
  });

  const ConnectedBlock = connect(
    mapStateToProps,
    mapDispatchToProps,
  )(reduxForm({
    form: `field-${name}`,
    validate,
  })(Block));

  return <ConnectedBlock key={name} />;
};
