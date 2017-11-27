import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { Link } from 'react-router-dom';

export default class SubmitField extends Component {
  static propTypes = {
    value: PropTypes.string,
    loading: PropTypes.bool,
    cancel: PropTypes.bool,
    disabled: PropTypes.bool
  };

  static defaultProps = {
    value: 'Submit',
    loading: false,
    cancel: true,
    disabled: false
  };

  render() {
    const { loading, value, cancel, disabled } = this.props;
    return (
      <div className="field is-grouped">
        <div className="control">
          <button
            className={classnames('button is-primary', { 'is-loading': loading })}
            disabled={disabled}
            type="submit"
          >
            {value}
          </button>
        </div>
        {cancel ? (
          <div className="control">
            <Link className="button is-text" to="/">
              Return
            </Link>
          </div>
        ) : null}
      </div>
    );
  }
}
