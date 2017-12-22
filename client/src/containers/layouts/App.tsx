import * as React from 'react';
import { compose } from 'react-apollo';
import { withRouter } from 'react-router';
import { Route, Switch } from 'react-router-dom';

import AllPosts from 'containers/posts/AllPosts';
import SearchPosts from 'containers/posts/SearchPosts';
import Post from 'containers/posts/Post';
import NewPost from 'containers/posts/NewPost';
import EditPost from 'containers/posts/EditPost';

import SignInUser from 'containers/users/SignInUser';
import SignUpUser from 'containers/users/SignUpUser';
import EditUserProfile from 'containers/users/EditUserProfile';
import ChangeUserPassword from 'containers/users/ChangeUserPassword';

import UserIsAuthenticated from 'components/UserIsAuthenticated';
import NotFound from 'components/NotFound';
import Header from 'containers/layouts/Header';

import FlashMessage from 'components/flash/FlashMessage';
import withFlashMessage from 'components/flash/withFlashMessage';
import withCurrentUser from 'queries/currentUserQuery';

import 'assets/stylesheets/css/application.css';

// typings
import { User } from 'types';
import { History } from 'history';

interface IProps {
  history: History;
  deleteFlashMessage: () => void;
  currentUser: User;
  currentUserLoading: boolean;
}

class App extends React.Component<IProps, {}> {
  private unsubscribeFromHistory: any;

  public componentWillMount() {
    const { history } = this.props;
    this.unsubscribeFromHistory = history.listen(this.handleLocationChange);
    this.handleLocationChange();
  }

  public componentWillUnmount() {
    if (this.unsubscribeFromHistory) this.unsubscribeFromHistory();
  }

  public handleLocationChange = () => {
    this.props.deleteFlashMessage();
  };

  public render() {
    const { currentUser, currentUserLoading } = this.props;

    return (
      <div>
        <Header currentUser={currentUser} currentUserLoading={currentUserLoading} />

        <main role="main">
          <section className="section">
            <div className="container">
              <div className="columns">
                <div className="column is-offset-2 is-8">
                  <FlashMessage />
                  <Switch>
                    <Route path="/" exact component={AllPosts} />
                    <Route path="/posts/search/:keywords" component={SearchPosts} />
                    <Route path="/posts/new" component={UserIsAuthenticated(NewPost)} />
                    <Route path="/posts/:id/edit" component={UserIsAuthenticated(EditPost)} />
                    <Route path="/posts/:id" component={Post} />
                    <Route path="/users/signin" component={SignInUser} />
                    <Route path="/users/signup" component={SignUpUser} />
                    <Route path="/users/profile/edit" component={UserIsAuthenticated(EditUserProfile)} />
                    <Route path="/users/password/edit" component={UserIsAuthenticated(ChangeUserPassword)} />
                    <Route component={NotFound} />
                  </Switch>
                </div>
              </div>
            </div>
          </section>
        </main>
      </div>
    );
  }
}

export default compose(withCurrentUser, withFlashMessage, withRouter)(App);
