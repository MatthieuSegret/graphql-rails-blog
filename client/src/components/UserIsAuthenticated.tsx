import * as React from 'react';
import { compose } from 'react-apollo';

import withFlashMessage from 'components/flash/withFlashMessage';
import withCurrentUser from 'queries/currentUserQuery';

// typings
import { User, FlashMessageVariables } from 'types';

interface IProps {
  redirect: (path: string, message: FlashMessageVariables) => void;
  currentUser: User;
  currentUserLoading: boolean;
}

export default function UserIsAuthenticated(WrappedComponent: React.ComponentType<any>) {
  class ComponentUserIsAuthenticated extends React.Component<IProps, {}> {
    constructor(props: IProps) {
      super(props);
      this.redirectIfUserIsNotAuthenticated = this.redirectIfUserIsNotAuthenticated.bind(this);
    }

    public componentWillMount() {
      this.redirectIfUserIsNotAuthenticated();
    }

    public componentWillReceiveProps(nextProps: IProps) {
      this.redirectIfUserIsNotAuthenticated(nextProps);
    }

    private redirectIfUserIsNotAuthenticated(props?: IProps) {
      const { currentUser, currentUserLoading } = props || this.props;
      if (!currentUserLoading && !currentUser) {
        this.props.redirect('/users/signin', {
          error: 'You need to sign in or sign up before continuing.'
        });
      }
    }

    public render() {
      const { currentUser, currentUserLoading } = this.props;
      if (currentUserLoading || !currentUser) {
        return null;
      }
      return <WrappedComponent {...this.props} />;
    }
  }

  return compose(withCurrentUser, withFlashMessage)(ComponentUserIsAuthenticated);
}
