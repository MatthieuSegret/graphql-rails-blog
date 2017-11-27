import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import SearchForm from 'containers/posts/_SearchForm';
import withCurrentUser from 'queries/currentUserQuery';

class ListPosts extends Component {
  static propTypes = {
    keywords: PropTypes.string,
    searchLoading: PropTypes.bool,
    currentUser: PropTypes.object
  };

  render() {
    const { keywords, searchLoading, currentUser } = this.props;

    return (
      <div className="head-posts row">
        <div className="col-md-8">
          <SearchForm initialKeywords={keywords} loading={searchLoading} />
        </div>
        {currentUser ? (
          <div className="col-md-4">
            <Link to="/posts/new" className="btn btn-primary create-post">
              New Post
            </Link>
          </div>
        ) : null}
      </div>
    );
  }
}

export default withCurrentUser(ListPosts);
