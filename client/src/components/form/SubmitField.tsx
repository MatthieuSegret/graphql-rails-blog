import * as React from 'react';
import classnames from 'classnames';
import { Link } from 'react-router-dom';

// typings
interface IProps {
  value?: string;
  loading?: boolean;
  cancel?: boolean;
  disabled?: boolean;
}

export default class SubmitField extends React.Component<IProps, {}> {
  public static defaultProps: IProps = {
    value: 'Submit',
    loading: false,
    cancel: true,
    disabled: false
  };

  public render() {
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
              Back
            </Link>
          </div>
        ) : null}
      </div>
    );
  }
}
