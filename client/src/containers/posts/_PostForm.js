import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Form, Field } from 'react-final-form';

import RenderField from 'components/form/RenderField';
import SubmitField from 'components/form/SubmitField';
import { required } from 'components/form/validation';

export default class PostForm extends Component {
  static propTypes = {
    action: PropTypes.func,
    submitName: PropTypes.string.isRequired,
    handleSubmit: PropTypes.func,
    initialValues: PropTypes.object,
    mutation: PropTypes.object
  };

  constructor(props) {
    super(props);
    this.submitForm = this.submitForm.bind(this);
  }

  async submitForm(values) {
    try {
      await this.props.action(values);
    } catch (errors) {
      return errors;
    }
  }

  render() {
    const { submitName, initialValues: post, mutation: { loading } } = this.props;

    return (
      <Form
        onSubmit={this.submitForm}
        initialValues={post}
        render={({ handleSubmit, pristine }) => (
          <form onSubmit={handleSubmit} className="post-form">
            <Field name="title" component={RenderField} validate={required} />
            <Field name="content" type="textarea" inputHtml={{ rows: 8 }} component={RenderField} validate={required} />
            <SubmitField loading={loading} value={submitName} />
          </form>
        )}
      />
    );
  }
}
