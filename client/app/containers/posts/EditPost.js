import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import gql from 'graphql-tag';

import PostForm from 'containers/posts/_PostForm';
import withPostForEditing from 'queries/posts/postForEditingQuery';
import Loading from 'components/Loading';

class EditPost extends Component {
  static propTypes = {
    data: PropTypes.object
  }

  render() {
    const { data: { post, loading } } = this.props;
    if (loading) { return <Loading />; }

    return (
      <div>
        <h1>Editing post</h1>
        <PostForm action={null} initialValues={{ ...post }} submitName="Update Post" />
        <Link to="/">Back</Link>
      </div>
    );
  }
}

export const fragments = {
  post: gql`
    fragment PostForEditingFragment on Post {
      id,
      title,
      content
    }
  `
};

export default withPostForEditing(EditPost);
