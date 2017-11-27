import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import classnames from 'classnames';

import { deleteFlashMessage } from 'components/flash/flashActions';

class FlashMessage extends Component {
  static propTypes = {
    message: PropTypes.object,
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
    if (!this.props.message) {
      return null;
    }

    const { type, text } = this.props.message;
    return (
      <div
        className={classnames('notification', {
          'is-success': type === 'notice',
          'is-danger': type === 'error'
        })}
      >
        <button onClick={this.onClick} className="delete" />
        {text}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    message: state.flashMessage
  };
}

export default connect(mapStateToProps, { deleteFlashMessage })(FlashMessage);
