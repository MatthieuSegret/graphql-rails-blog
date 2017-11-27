import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import PostInfos from 'containers/posts/_PostInfos';
import PostActions from 'containers/posts/_PostActions';
import withCurrentUser from 'queries/currentUserQuery';

class PostPreview extends Component {
  static propTypes = {
    post: PropTypes.object.isRequired,
    currentUser: PropTypes.object
  };

  render() {
    const { post, currentUser } = this.props;

    return (
      <div className="post">
        <div className="post-preview">
          <div className="title-wrapper">
            <h2 className="title is-4">
              <Link to={`/posts/${post.id}`}>{post.title}</Link>
            </h2>
            {currentUser && currentUser.id === post.author.id ? <PostActions post={post} /> : null}
          </div>

          <PostInfos post={post} />
          <div className="post-begin">{post.description}</div>
        </div>
      </div>
    );
  }
}

export default withCurrentUser(PostPreview);
