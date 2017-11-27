import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'react-apollo';

import PostForm from 'containers/posts/_PostForm';

import POST_FOR_EDITING from 'graphql/posts/postForEditingQuery.graphql';
import UPDATE_POST from 'graphql/posts/updatePostMutation.graphql';

class EditPost extends Component {
  static propTypes = {
    data: PropTypes.object,
    updatePost: PropTypes.func
  };

  constructor(props) {
    super(props);
    this.action = this.action.bind(this);
  }

  action(values) {
    return new Promise((resolve, reject) => {
      this.props.updatePost(values).then(response => {
        const errors = response.data.updatePost.errors;
        if (!errors) {
          this.props.redirect('/', { notice: 'Post was successfully updated' });
        } else {
          reject(errors);
        }
      });
    });
  }

  render() {
    const { data: { post, loading } } = this.props;
    if (!post) {
      return null;
    }

    return (
      <div>
        <h1 className="title">Editing post</h1>
        <PostForm action={this.action} initialValues={{ ...post }} submitName="Update Post" />
      </div>
    );
  }
}

const withPostForEditing = graphql(POST_FOR_EDITING, {
  options: ownProps => ({
    variables: {
      id: ownProps.match.params.id
    },
    fetchPolicy: 'network-only'
  })
});

const withUpdatePost = graphql(UPDATE_POST, {
  props: ({ mutate }) => ({
    updatePost(post) {
      return mutate({ variables: { ...post } });
    }
  })
});

export default withPostForEditing(withUpdatePost(EditPost));
