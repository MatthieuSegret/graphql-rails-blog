import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import SearchForm from 'containers/posts/_SearchForm';
import withCurrentUser from 'queries/currentUserQuery';

class ListPosts extends Component {
  static propTypes = {
    keywords: PropTypes.string,
    currentUser: PropTypes.object
  };

  render() {
    const { keywords, currentUser } = this.props;

    return (
      <div className="columns">
        <div className="column">
          <div className="content">
            <SearchForm initialKeywords={keywords} />
          </div>
        </div>
        {currentUser ? (
          <div className="column">
            <Link to="/posts/new" className="button is-primary is-pulled-right">
              New Post
            </Link>
          </div>
        ) : null}
      </div>
    );
  }
}

export default withCurrentUser(ListPosts);
