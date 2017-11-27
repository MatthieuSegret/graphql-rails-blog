import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

export default class Button extends Component {
  static propTypes = {
    value: PropTypes.string.isRequired,
    className: PropTypes.string,
    loading: PropTypes.bool,
    disabled: PropTypes.bool
  };

  static defaultProps = {
    loading: false,
    className: '',
    disabled: false
  };

  render() {
    const { loading, value, className, disabled } = this.props;

    return (
      <button type="submit" className={classnames('btn btn-default', className)} disabled={disabled}>
        {loading ? 'Loading...' : value}
      </button>
    );
  }
}
