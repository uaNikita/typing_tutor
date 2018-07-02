import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm, SubmissionError } from 'redux-form/immutable';
import _ from 'lodash';

import { processSetSettings } from 'ReduxUtils/reducers/user';

import RenderField from 'Blocks/RenderField/component';

import { validateField } from 'Utils/validation';

export default (options) => {
  const {
    key,
    label,
    type,
  } = options;

  class Block extends Component {
    submit = (values) => {
      const {
        props: {
          setSettings,
          initialValues,
        },
      } = this;

      const settings = values.toJS();

      settings[key] = _.trim(settings[key]);

      let result = false;

      if (initialValues.get(key) !== settings[key]) {
        result = setSettings(settings)
          .then((res) => {
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
        name: key,
        onBlur: handleSubmit(submit),
        component: RenderField,
        loader: true,
      };

      fieldProps.label = label || _.upperFirst(key);

      if (type) {
        fieldProps.type = type;
      }

      return (
        <form onSubmit={handleSubmit(submit)}>
          <Field {...fieldProps} />
        </form>
      );
    }
  }

  const validate = values => ({
    ...validateField(key, values.get(key)),
  });

  const mapStateToProps = (state) => {
    const result = {
      initialValues: {},
    };

    result.initialValues[key] = state.getIn(['user', key]);

    return result;
  };

  const mapDispatchToProps = dispatch => ({
    setSettings: (...args) => dispatch(processSetSettings(...args)),
  });

  const ConnectedBlock = connect(
    mapStateToProps,
    mapDispatchToProps,
  )(reduxForm({
    form: `field-${key}`,
    validate,
  })(Block));

  return <ConnectedBlock />;
};
