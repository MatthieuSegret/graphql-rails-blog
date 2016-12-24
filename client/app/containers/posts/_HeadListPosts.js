import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';

import SearchForm from 'containers/posts/_SearchForm';

export default class ListPosts extends Component {
  static propTypes = {
    keywords: PropTypes.string,
    searchLoading: PropTypes.bool
  }

  render() {
    const { keywords, searchLoading } = this.props;

    return (
      <div className="head-posts row">
        <div className="col-md-8">
          <SearchForm initialKeywords={keywords} loading={searchLoading} />
        </div>

        <div className="col-md-4">
          <Link to="posts/new" className="btn btn-primary create-post">New Post</Link>
        </div>
      </div>
    );
  }
}
