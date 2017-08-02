import React, { Component } from 'react';
import PropTypes from 'prop-types';

import withFlashMessage from 'components/withFlashMessage';
import withCurrentUser from 'queries/users/currentUserQuery';

export default function UserIsAuthenticated(WrappedComponent) {
  class ComponentUserIsAuthenticated extends Component {
    static propTypes = {
      redirect: PropTypes.func,
      currentUser: PropTypes.object
    };

    constructor(props) {
      super(props);
      this.redirectIfUserIsNotAuthenticated = this.redirectIfUserIsNotAuthenticated.bind(this);
    }

    componentWillMount() {
      this.redirectIfUserIsNotAuthenticated();
    }

    componentWillReceiveProps(nextProps) {
      this.redirectIfUserIsNotAuthenticated(nextProps);
    }

    redirectIfUserIsNotAuthenticated(props = null) {
      const { currentUser } = props || this.props;
      if (!currentUser) {
        this.props.redirect('/users/signin', {
          error: 'You need to sign in or sign up before continuing.'
        });
      }
    }

    render() {
      return <WrappedComponent {...this.props} />;
    }
  }

  return withCurrentUser(withFlashMessage(ComponentUserIsAuthenticated));
}
