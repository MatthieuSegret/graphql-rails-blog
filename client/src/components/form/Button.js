import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

export default class Button extends Component {
  static propTypes = {
    value: PropTypes.string.isRequired,
    className: PropTypes.string,
    loading: PropTypes.bool
  }

  static defaultProps = {
    loading: false,
    className: ''
  }

  render() {
    const { loading, value, className } = this.props;

    return (
      <button type="submit" className={classnames('btn btn-default', className)} disabled={loading ? 'disabled' : false}>{loading ? 'Loading...' : value}</button>
    );
  }
}
