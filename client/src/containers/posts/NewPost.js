import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';

import PostForm from 'containers/posts/_PostForm';
import withCreatePost from 'mutations/posts/createPostMutation';

class NewPost extends Component {
  static propTypes = {
    createPost: PropTypes.func
  }

  render() {
    return (
      <div>
        <h1>New Post</h1>
        <PostForm action={this.props.createPost} submitName="Create Post" />
        <Link to="/">Back</Link>
      </div>
    );
  }
}

export default withCreatePost(NewPost);
