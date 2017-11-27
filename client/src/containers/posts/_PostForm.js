import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { reduxForm, Field, SubmissionError } from 'redux-form';

import RenderField from 'components/form/RenderField';
import Button from 'components/form/Button';

class PostForm extends Component {
  static propTypes = {
    action: PropTypes.func,
    submitName: PropTypes.string.isRequired,
    handleSubmit: PropTypes.func
  };

  constructor(props) {
    super(props);
    this.state = { loading: false };
    this.submitForm = this.submitForm.bind(this);
  }

  submitForm(values) {
    this.setState({ loading: true });
    return this.props.action(values).catch(errors => {
      this.setState({ loading: false });
      console.log(errors);
      throw new SubmissionError(errors);
    });
  }

  render() {
    const { handleSubmit, submitName, pristine, submitting } = this.props;
    const { loading } = this.state;

    return (
      <form onSubmit={handleSubmit(this.submitForm)}>
        <Field name="title" component={RenderField} type="text" />
        <Field name="content" component={RenderField} type="textarea" />
        <Button loading={loading} value={submitName} disabled={pristine || submitting} />
      </form>
    );
  }
}

function validate(values) {
  const errors = {};
  if (!values.title) {
    errors.title = "can't be blank";
  }
  if (!values.content) {
    errors.content = "can't be blank";
  }
  return errors;
}

export default reduxForm({
  form: 'PostForm',
  validate
})(PostForm);
