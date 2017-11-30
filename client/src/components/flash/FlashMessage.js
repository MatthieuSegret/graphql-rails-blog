import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { graphql, compose } from 'react-apollo';
import classnames from 'classnames';

import withFlashMessage from 'components/flash/withFlashMessage';
import FLASH_MESSAGE from 'graphql/flash/flashMessageQuery.graphql';

class FlashMessage extends Component {
  static propTypes = {
    data: PropTypes.object,
    deleteFlashMessage: PropTypes.func
  };

  constructor(props) {
    super(props);
    this.onClick = this.onClick.bind(this);
  }

  onClick() {
    this.props.deleteFlashMessage();
  }

  render() {
    const { message } = this.props.data;
    if (!message) {
      return null;
    }
    const { type, text } = message;

    return (
      <div
        className={classnames('notification', {
          'is-primary': type === 'notice',
          'is-danger': type === 'error'
        })}
      >
        <button onClick={this.onClick} className="delete" />
        {text}
      </div>
    );
  }
}

export default compose(graphql(FLASH_MESSAGE), withFlashMessage)(FlashMessage);
