import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import { reduxForm, Field, SubmissionError } from 'redux-form';

import RenderField from 'components/form/RenderField';
import Button from 'components/form/Button';
import withCreatePost from 'mutations/posts/createPostMutation';
import withFlashMessage from 'components/withFlashMessage';

class NewPost extends Component {
  static propTypes = {
    createPost: PropTypes.func,
    handleSubmit: PropTypes.func,
    redirect: PropTypes.func,
    error: PropTypes.func
  }

  constructor(props) {
    super(props);
    this.state = { loading: false };
    this.submitForm = this.submitForm.bind(this);
  }

  submitForm(values) {
    this.setState({ loading: true });
    return this.props.createPost(values).then((errors) => {
      this.setState({ loading: false });
      console.log(errors);
      console.log(this.props);
      if (!errors) {
        this.props.redirect('/', { notice: 'Post was successfully created' });
      } else {
        this.props.error('Please review the problems below:');
        throw new SubmissionError(errors);
      }
    });
  }

  render() {
    const { handleSubmit } = this.props;
    const { loading } = this.state;

    return (
      <div>
        <h1>New Post</h1>
        <form onSubmit={handleSubmit(this.submitForm)}>
          <Field name="title" component={RenderField} type="text" />
          <Field name="content" component={RenderField} type="textarea" />
          <Button loading={loading} value="Create Post" />
        </form>
        <Link to="/">Back</Link>
      </div>
    );
  }
}

function validate(values) {
  const errors = {};
  if (!values.title) { errors.title = "can't be blank"; }
  if (!values.content) { errors.content = "can't be blank"; }
  return errors;
}

export default reduxForm({
  form: 'PostForm',
  validate
})(withCreatePost(withFlashMessage(NewPost)));
