import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Loading from 'components/Loading';
import PostPreview from 'containers/posts/_PostPreview';

import withCurrentUser from 'queries/users/currentUserQuery';

class ListPosts extends Component {
  static propTypes = {
    posts: PropTypes.array,
    postsCount: PropTypes.number,
    loading: PropTypes.bool,
    loadMorePosts: PropTypes.func,
    currentUser: PropTypes.object
  };

  constructor(props) {
    super(props);
    this.postsPreview = this.postsPreview.bind(this);
  }

  postsPreview() {
    const { posts } = this.props;
    if (!posts) {
      return null;
    }
    return posts.map(post => {
      return <PostPreview key={post.id} post={post} />;
    });
  }

  render() {
    const { posts, postsCount, loading, loadMorePosts, currentUser } = this.props;
    return (
      <div className="list-posts">
        <table className="table table-bordered table-striped">
          <thead>
            <tr>
              <th>Title</th>
              <th>User</th>
              <th>Created at</th>
              {currentUser ? <th colSpan="2" /> : null}
            </tr>
          </thead>

          <tbody>
            {this.postsPreview()}
          </tbody>
        </table>

        {loading ? <Loading /> : null}

        {!loading && posts && posts.length < postsCount
          ? <button
              className="btn btn-sm btn-default center-block load-more"
              onClick={loadMorePosts}
            >
              Load more
            </button>
          : null}
      </div>
    );
  }
}

export default withCurrentUser(ListPosts);
