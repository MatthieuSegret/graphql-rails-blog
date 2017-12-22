import * as React from 'react';
import { graphql, compose } from 'react-apollo';
import { withRouter } from 'react-router';

import CREATE_FLASH_MESSAGE from 'graphql/flash/createFlashMessageMutation.graphql';
import DELETE_FLASH_MESSAGE from 'graphql/flash/deleteFlashMessageMutation.graphql';

// typings
import { History } from 'history';
import { FlashMessage, FlashMessageVariables } from 'types';

interface IProps {
  createFlashMessage: (message: FlashMessage) => void;
  deleteFlashMessage: () => void;
  history: History;
}

interface IWrapProps {
  redirect: (path: string, message: FlashMessageVariables) => void;
  notice: (text: string) => void;
  error: (text: string) => void;
}

export default function withFlashMessage(WrappedComponent: React.ComponentType<IWrapProps>) {
  class ComponentWithFlashMessage extends React.Component<IProps, {}> {
    constructor(props: IProps) {
      super(props);
      this.notice = this.notice.bind(this);
      this.error = this.error.bind(this);
      this.redirect = this.redirect.bind(this);
    }

    public notice(text: string) {
      this.props.createFlashMessage({ type: 'notice', text });
    }

    public error(text: string) {
      this.props.createFlashMessage({ type: 'error', text });
    }

    public deleteFlashMessage() {
      this.props.deleteFlashMessage();
    }

    public redirect(path: string, message: FlashMessageVariables) {
      this.props.history.push(path);
      if (message && message.error) {
        this.error(message.error);
      }
      if (message && message.notice) {
        this.notice(message.notice);
      }
    }

    public render() {
      return <WrappedComponent {...this.props} redirect={this.redirect} notice={this.notice} error={this.error} />;
    }
  }

  const withCreateFlashMessage = graphql(CREATE_FLASH_MESSAGE, {
    props: ({ mutate }) => ({
      createFlashMessage(message: FlashMessage) {
        return mutate!({ variables: { ...message } });
      }
    })
  });

  const withDeleteFlashMessage = graphql(DELETE_FLASH_MESSAGE, {
    props: ({ mutate }) => ({
      deleteFlashMessage() {
        return mutate!({});
      }
    })
  });

  return compose(withCreateFlashMessage, withDeleteFlashMessage, withRouter)(ComponentWithFlashMessage);
}
