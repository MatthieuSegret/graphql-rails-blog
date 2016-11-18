import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { deleteFlashMessage } from 'actions/flashActions';
import classnames from 'classnames';

class FlashMessage extends Component {
  static propTypes = {
    message: PropTypes.object,
    deleteFlashMessage: PropTypes.func
  }

  constructor(props) {
    super(props);
    this.onClick = this.onClick.bind(this);
  }

  onClick() {
    this.props.deleteFlashMessage();
  }

  render() {
    if (!this.props.message) { return null; }

    const { type, text } = this.props.message;
    return (
      <div className={classnames('alert', { 'alert-success': type === 'notice', 'alert-danger': type === 'error' })}>
        <button onClick={this.onClick} className="close"><span>&times;</span></button>
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
