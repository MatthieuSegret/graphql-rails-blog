import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { graphql } from 'react-apollo';

import PostForm from 'containers/posts/_PostForm';

import CREATE_POST from 'graphql/posts/createPostsMutation.graphql';
import POSTS from 'graphql/posts/postsQuery.graphql';

class NewPost extends Component {
  static propTypes = {
    createPost: PropTypes.func
  };

  constructor(props) {
    super(props);
    this.action = this.action.bind(this);
  }

  action(values) {
    return new Promise((resolve, reject) => {
      this.props.createPost(values).then(response => {
        const errors = response.data.createPost.errors;
        if (!errors) {
          this.props.redirect('/', { notice: 'Post was successfully created.' });
        } else {
          reject(errors);
        }
      });
    });
  }

  render() {
    return (
      <div>
        <h1>New Post</h1>
        <PostForm action={this.action} submitName="Create Post" />
        <Link to="/">Back</Link>
      </div>
    );
  }
}

const withCreatePost = graphql(CREATE_POST, {
  props: ({ ownProps, mutate }) => ({
    createPost(post) {
      return mutate({
        variables: { ...post },
        update: (store, { data: { createPost: { newPost } } }) => {
          if (!newPost) return false;
          const data = store.readQuery({ query: POSTS });
          data.posts.unshift(newPost);
          data.postsCount += 1;
          store.writeQuery({ query: POSTS, data });
        }
      });
    }
  })
});

export default withCreatePost(NewPost);
