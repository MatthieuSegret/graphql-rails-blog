import React, { Component, PropTypes } from 'react';

import withFlashMessage from 'components/withFlashMessage';

export default function UserIsAuthenticated(WrappedComponent) {
  class ComponentUserIsAuthenticated extends Component {
    static propTypes = {
      redirect: PropTypes.func,
      currentUser: PropTypes.object,
      currentUserLoading: PropTypes.bool
    }

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
      const { currentUser, currentUserLoading } = props || this.props;
      if (!currentUserLoading && !currentUser) {
        this.props.redirect('/users/signin', { error: 'You need to sign in or sign up before continuing.' });
      }
    }

    render() {
      return <WrappedComponent {...this.props} />;
    }
  }

  return withFlashMessage(ComponentUserIsAuthenticated);
}
