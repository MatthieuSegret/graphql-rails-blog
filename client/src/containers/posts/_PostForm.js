import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { reduxForm, Field, SubmissionError } from 'redux-form';

import RenderField from 'components/form/RenderField';
import SubmitField from 'components/form/SubmitField';

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
      <form onSubmit={handleSubmit(this.submitForm)} className="post-form">
        <Field name="title" component={RenderField} />
        <Field name="content" type="textarea" inputHtml={{ rows: 8 }} component={RenderField} />
        <SubmitField loading={loading} disabled={pristine || submitting} value={submitName} />
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
