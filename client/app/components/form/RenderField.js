import React, { Component, PropTypes } from 'react';
import capitalize from 'utils/stringEnhancer';

export default class RenderField extends Component {
  static propTypes = {
    input: PropTypes.object.isRequired,
    meta: PropTypes.object.isRequired,
    type: PropTypes.string.isRequired,
    rows: PropTypes.number,
    placeholder: PropTypes.string,
    label: PropTypes.string,
    initialValue: PropTypes.object
  }

  static defaultProps = {
    type: 'text',
    rows: 6,
    placeholder: '',
    label: ''
  }

  constructor(props) {
    super(props);
    const { label, input: { name } } = this.props;
    this.state = { label: label || capitalize(name) };
    this.input = this.input.bind(this);
  }

  input() {
    const { input, type, rows, placeholder, input: { name } } = this.props;
    if (type === 'textarea') {
      return <textarea className="string optional form-control" rows={rows} id={name} placeholder={placeholder} {...input} />;
    }
    return <input type={type} className="string optional form-control" id={name} placeholder={placeholder} {...input} />;
  }

  render() {
    const { name, meta, label } = this.props;

    return (
      <div className={`form-group ${meta.touched && meta.invalid ? 'has-error' : ''}`}>
        <label className="string optional control-label" htmlFor={name}>{this.state.label}</label>
        {this.input()}
        { meta.touched &&
          meta.error &&
          <span className="help-block">{meta.error}</span>}
      </div>
    );
  }
}
