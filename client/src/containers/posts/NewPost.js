import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { graphql, compose } from 'react-apollo';
import withMutationState from 'apollo-mutation-state';

import PostForm from 'containers/posts/_PostForm';
import withFlashMessage from 'components/flash/withFlashMessage';

import CREATE_POST from 'graphql/posts/createPostsMutation.graphql';
import POSTS from 'graphql/posts/postsQuery.graphql';

class NewPost extends Component {
  static propTypes = {
    createPost: PropTypes.func,
    redirect: PropTypes.func
  };

  constructor(props) {
    super(props);
    this.action = this.action.bind(this);
  }

  async action(values) {
    return new Promise(async (resolve, reject) => {
      const { data: { createPost: { errors } } } = await this.props.createPost(values);
      if (!errors) {
        this.props.redirect('/', { notice: 'Post was successfully created.' });
      } else {
        reject(errors);
      }
    });
  }

  render() {
    return (
      <div>
        <h1 className="title">New Post</h1>
        <PostForm action={this.action} submitName="Create Post" mutation={this.props.mutation} />
      </div>
    );
  }
}

const withCreatePost = graphql(CREATE_POST, {
  props: ({ mutate, ownProps: { wrapMutate } }) => ({
    createPost(post) {
      return wrapMutate(
        mutate({
          variables: { ...post },
          update: (store, { data: { createPost: { newPost } } }) => {
            if (!newPost) return false;
            const data = store.readQuery({ query: POSTS });
            data.posts.unshift(newPost);
            data.postsCount += 1;
            store.writeQuery({ query: POSTS, data });
          }
        })
      );
    }
  })
});

export default compose(withMutationState({ wrapper: true, propagateError: true }), withCreatePost, withFlashMessage)(
  NewPost
);
