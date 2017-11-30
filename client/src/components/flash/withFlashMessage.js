import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { graphql, compose } from 'react-apollo';
import { withRouter } from 'react-router';

import CREATE_FLASH_MESSAGE from 'graphql/flash/createFlashMessageMutation.graphql';
import DELETE_FLASH_MESSAGE from 'graphql/flash/deleteFlashMessageMutation.graphql';

export default function withFlashMessage(WrappedComponent) {
  class ComponentWithFlashMessage extends Component {
    static propTypes = {
      createFlashMessage: PropTypes.func,
      deleteFlashMessage: PropTypes.func,
      history: PropTypes.object
    };

    constructor(props) {
      super(props);
      this.notice = this.notice.bind(this);
      this.error = this.error.bind(this);
      this.redirect = this.redirect.bind(this);
    }

    notice(text) {
      this.props.createFlashMessage({ type: 'notice', text });
    }

    error(text) {
      this.props.createFlashMessage({ type: 'error', text });
    }

    deleteFlashMessage() {
      this.props.deleteFlashMessage();
    }

    redirect(path, message) {
      this.props.history.push(path);
      if (message && message.error) {
        this.error(message.error);
      }
      if (message && message.notice) {
        this.notice(message.notice);
      }
    }

    render() {
      return <WrappedComponent {...this.props} redirect={this.redirect} notice={this.notice} error={this.error} />;
    }
  }

  const withCreateFlashMessage = graphql(CREATE_FLASH_MESSAGE, {
    props: ({ mutate }) => ({
      createFlashMessage(message) {
        return mutate({ variables: { ...message } });
      }
    })
  });

  const withDeleteFlashMessage = graphql(DELETE_FLASH_MESSAGE, {
    props: ({ mutate }) => ({
      deleteFlashMessage() {
        return mutate({});
      }
    })
  });

  return compose(withCreateFlashMessage, withDeleteFlashMessage, withRouter)(ComponentWithFlashMessage);
}
