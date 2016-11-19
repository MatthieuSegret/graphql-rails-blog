import React, { Component, PropTypes } from 'react';
import { reduxForm, Field } from 'redux-form';

import RenderField from 'components/form/RenderField';
import Button from 'components/form/Button';

class NewComment extends Component {
  static propTypes = {
    postId: PropTypes.string.isRequired,
    handleSubmit: PropTypes.func
  }

  constructor(props) {
    super(props);
    this.submitForm = this.submitForm.bind(this);
  }

  submitForm(values) {
    // TODO: create comment
  }

  render() {
    const { handleSubmit } = this.props;

    return (
      <div className="new-comment">
        <form onSubmit={handleSubmit(this.submitForm)}>
          <Field name="body" component={RenderField} type="textarea" rows={2} label="New comment" />
          <Button loading={false} value="Create comment" />
        </form>
      </div>
    );
  }
}

export default reduxForm({
  form: 'CommentForm'
})(NewComment);
