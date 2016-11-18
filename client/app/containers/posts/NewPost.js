import React, { Component, PropTypes } from 'react';
import { Link, withRouter } from 'react-router';
import { reduxForm, Field } from 'redux-form';

import RenderField from 'components/form/RenderField';
import Button from 'components/form/Button';
import withCreatePost from 'mutations/posts/createPostMutation';

class NewPost extends Component {
  static propTypes = {
    createPost: PropTypes.func,
    handleSubmit: PropTypes.func,
    router: PropTypes.object
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
      this.props.router.push('/');
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

export default reduxForm({
  form: 'PostForm'
})(withCreatePost(withRouter(NewPost)));
