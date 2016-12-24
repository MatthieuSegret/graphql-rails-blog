import React, { Component, PropTypes } from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

import Loading from 'components/Loading';
import PostPreview from 'containers/posts/_PostPreview';

class AllPosts extends Component {
  static propTypes = {
    data: PropTypes.object
  }

  constructor(props) {
    super(props);
    this.postsPreview = this.postsPreview.bind(this);
  }

  postsPreview() {
    const { data: { posts } } = this.props;
    if (!posts) { return null; }
    return posts.map((post) => {
      return <PostPreview key={post.id} post={post} />;
    });
  }

  render() {
    const { data: { loading } } = this.props;
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
      </div>
    );
  }
}

const GET_POSTS = gql`
  query posts {
    posts {
      ...PostPreviewFragment
    }
  }
  ${PostPreview.fragments.post}
`;

export default graphql(GET_POSTS)(AllPosts);
