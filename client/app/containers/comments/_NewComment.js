import React, { Component, PropTypes } from 'react';
import { reduxForm, Field, SubmissionError } from 'redux-form';

import RenderField from 'components/form/RenderField';
import Button from 'components/form/Button';
import withCreateComment from 'mutations/comments/createCommentMutation';

class NewComment extends Component {
  static propTypes = {
    postId: PropTypes.string.isRequired,
    createComment: PropTypes.func,
    handleSubmit: PropTypes.func,
    reset: PropTypes.func
  }

  constructor(props) {
    super(props);
    this.state = { loading: false };
    this.submitForm = this.submitForm.bind(this);
  }

  submitForm(values) {
    const { createComment, postId, reset } = this.props;
    this.setState({ loading: true });
    return createComment(postId, values).then((errors) => {
      this.setState({ loading: false });
      if (errors) { throw new SubmissionError(errors); } else { reset(); }
    });
  }

  render() {
    const { handleSubmit } = this.props;
    const { loading } = this.state;

    return (
      <div className="new-comment">
        <form onSubmit={handleSubmit(this.submitForm)}>
          <Field name="content" component={RenderField} type="textarea" rows={2} label="New comment" />
          <Button loading={loading} value="Create comment" />
        </form>
      </div>
    );
  }
}

export default reduxForm({
  form: 'CommentForm'
})(withCreateComment(NewComment));
