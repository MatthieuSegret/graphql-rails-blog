import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import { reduxForm, Field } from 'redux-form';

import RenderField from 'components/form/RenderField';
import Button from 'components/form/Button';

class NewPost extends Component {
  static propTypes = {
    handleSubmit: PropTypes.func
  }

  constructor(props) {
    super(props);
    this.submitForm = this.submitForm.bind(this);
  }

  submitForm(values) {
    // TODO: create post
  }

  render() {
    const { handleSubmit } = this.props;

    return (
      <div>
        <h1>New Post</h1>
        <form onSubmit={handleSubmit(this.submitForm)}>
          <Field name="title" component={RenderField} type="text" />
          <Field name="content" component={RenderField} type="textarea" />
          <Button loading={false} value="Create Post" />
        </form>
        <Link to="/">Back</Link>
      </div>
    );
  }
}

export default reduxForm({ form: 'PostForm' })(NewPost);
