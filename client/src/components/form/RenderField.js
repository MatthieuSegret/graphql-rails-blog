import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import capitalize from 'utils/stringUtils';

export default class RenderField extends Component {
  static propTypes = {
    input: PropTypes.object.isRequired,
    meta: PropTypes.object.isRequired,
    type: PropTypes.string,
    inputHtml: PropTypes.object,
    options: PropTypes.array,
    className: PropTypes.string,
    label: PropTypes.string,
    hint: PropTypes.string
  };

  static defaultProps = {
    type: 'text',
    label: '',
    options: []
  };

  constructor(props) {
    super(props);
    const { label, input: { name } } = this.props;
    this.state = { label: label || capitalize(name) };
    this.input = this.input.bind(this);
    this.stateClass = this.stateClass.bind(this);
    this.defaultWrapper = this.defaultWrapper.bind(this);
    this.checkboxWrapper = this.checkboxWrapper.bind(this);
    this.fileWrapper = this.fileWrapper.bind(this);
  }

  input(_inputHtml) {
    const { input, type, inputHtml, options, input: { name } } = this.props;
    let inputClass = classnames(
      inputHtml && inputHtml.className,
      _inputHtml && _inputHtml.className,
      this.stateClass()
    );

    switch (type) {
      case 'textarea':
        inputClass = classnames('textarea', inputClass);
        return <textarea id={name} {...input} {...inputHtml} className={inputClass} />;
      case 'file':
        const { onChange, onBlur, value, ...fileInput } = input;
        const onFileChange = handler => ({ target: { files } }) => {
          handler(files.length ? files[0] : null);
        };
        return (
          <input
            type="file"
            id={name}
            {...fileInput}
            {...inputHtml}
            onChange={onFileChange(onChange)}
            onBlur={onFileChange(onBlur)}
            className={inputClass}
          />
        );
      case 'checkbox':
        return <input type="checkbox" id={name} {...input} {...inputHtml} className={inputClass} />;
      case 'select':
        return (
          <div className="select">
            <select id={name} {...input} {...inputHtml} className={inputClass}>
              {options.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        );
      default:
        inputClass = classnames('input', inputClass);
        return <input type={type} id={name} {...input} {...inputHtml} className={inputClass} />;
    }
  }

  defaultWrapper() {
    return [
      <label key="label" className="label" htmlFor={this.props.name}>
        {this.state.label}
      </label>,
      <div key="control" className="control">
        {this.input()}
      </div>
    ];
  }

  checkboxWrapper() {
    return (
      <div className="control">
        <label className="checkbox" htmlFor={this.props.name}>
          {this.input()}
          {this.state.label}
        </label>
      </div>
    );
  }

  fileWrapper() {
    const value = this.props.input.value;
    const filename = value && value.name;

    return (
      <div className="file">
        <label className="file-label is-medium">
          {this.input({ className: 'file-input' })}
          <span className="file-cta">
            <span className="file-icon">
              <i className="fa fa-upload" />
            </span>
            <span className="file-label">{this.state.label}</span>
          </span>
          {filename ? <span className="file-name">{filename}</span> : null}
        </label>
      </div>
    );
  }

  render() {
    const { type, meta, className, hint } = this.props;

    let wrapper = null;
    switch (type) {
      case 'checkbox':
        wrapper = this.checkboxWrapper();
        break;
      case 'file':
        wrapper = this.fileWrapper();
        break;
      default:
        wrapper = this.defaultWrapper();
    }

    return (
      <div className={classnames('field', className)}>
        {wrapper}
        {(meta.error || meta.submitError) &&
          meta.touched && <p className="help is-danger">{meta.error || meta.submitError}</p>}
        {hint && <p className="help">{hint}</p>}
      </div>
    );
  }

  stateClass() {
    const { meta } = this.props;
    return { 'is-danger': meta.touched && meta.invalid };
  }
}
