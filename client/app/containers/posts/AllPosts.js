import React, { Component, PropTypes } from 'react';

import Loading from 'components/Loading';
import PostPreview from 'containers/posts/_PostPreview';
import withPosts from 'queries/posts/postsQuery';

class AllPosts extends Component {
  static propTypes = {
    data: PropTypes.object,
    loadMorePosts: PropTypes.func
  }

  constructor(props) {
    super(props);
    this.postsPreview = this.postsPreview.bind(this);
  }

  postsPreview() {
    const { posts } = this.props.data;
    if (!posts) { return null; }
    return posts.map((post) => {
      return <PostPreview key={post.id} post={post} />;
    });
  }

  render() {
    const { data: { posts, postsCount, loading }, loadMorePosts } = this.props;
    return (
      <div className="all-posts">
        <h1>Listing posts</h1>
        <table className="table table-bordered table-striped">
          <thead>
            <tr>
              <th>Title</th>
              <th>User</th>
              <th>Created at</th>
            </tr>
          </thead>

          <tbody>
            {this.postsPreview()}
          </tbody>
        </table>

        {loading ? <Loading /> : null}

        {(posts && posts.length < postsCount) ?
          <button className="btn btn-sm btn-default center-block load-more" onClick={loadMorePosts}>Load more</button> : null}
      </div>
    );
  }
}

export default withPosts(AllPosts);
