import * as React from 'react';
import classnames from 'classnames';
import capitalize from 'utils/stringUtils';

// typings
import { IFormInput, IMeta, IOption } from 'components/form/renderField.d';

interface IProps {
  input: IFormInput;
  meta: IMeta;
  type: string;
  inputHtml?: any;
  options?: Array<IOption>;
  className?: string;
  label?: string;
  hint?: string;
  name: string;
}

interface IState {
  label: string;
}

export default class RenderField extends React.Component<IProps, IState> {
  public static defaultProps = {
    type: 'text',
    label: '',
    options: [],
    inputHtml: {
      className: ''
    }
  };

  constructor(props: IProps) {
    super(props);
    const { label, input: { name } } = this.props;
    this.state = { label: label || capitalize(name) };
    this.input = this.input.bind(this);
    this.stateClass = this.stateClass.bind(this);
    this.defaultWrapper = this.defaultWrapper.bind(this);
    this.checkboxWrapper = this.checkboxWrapper.bind(this);
    this.fileWrapper = this.fileWrapper.bind(this);
  }

  private input(type: string, input: IFormInput, inputHtml: any, selectOptions?: Array<IOption>): JSX.Element {
    let inputClass = classnames(inputHtml.className, this.stateClass());

    switch (type) {
      case 'textarea':
        inputClass = classnames('textarea', inputClass);
        return <textarea id={input.name} {...input} {...inputHtml} className={inputClass} />;
      case 'file':
        const { onChange, onBlur, value, ...fileInput } = input;
        const onFileChange = (handler: any) => ({ target: { files } }: any) => {
          handler(files.length ? files[0] : null);
        };
        return (
          <input
            type="file"
            id={input.name}
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
            <select id={input.name} {...input} {...inputHtml} className={inputClass}>
              {selectOptions!.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        );
      default:
        inputClass = classnames('input', inputClass);
        return <input type={type} id={input.name} {...input} {...inputHtml} className={inputClass} />;
    }
  }

  private defaultWrapper(
    type: string,
    input: IFormInput,
    inputHtml: any,
    selectOptions?: Array<IOption>
  ): React.ReactNode {
    return [
      <label key="label" className="label" htmlFor={input.name}>
        {this.state.label}
      </label>,
      <div key="control" className="control">
        {this.input(type, input, inputHtml, selectOptions)}
      </div>
    ];
  }

  private checkboxWrapper(type: string, input: IFormInput, inputHtml: any): React.ReactNode {
    return (
      <div className="control">
        <label className="checkbox" htmlFor={input.name}>
          {this.input(type, input, inputHtml)}
          {this.state.label}
        </label>
      </div>
    );
  }

  private fileWrapper(type: string, input: IFormInput, inputHtml: any) {
    const value = input.value;
    const filename = value && value.name;
    const newInputHtml = { ...inputHtml, className: classnames(inputHtml.className, 'file-input') };

    return (
      <div className="file">
        <label className="file-label is-medium">
          {this.input(type, input, newInputHtml)}
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

  public render() {
    const { type, meta, className, hint, input, inputHtml, options: selectOptions } = this.props;

    let wrapper: React.ReactNode = null;
    switch (type) {
      case 'checkbox':
        wrapper = this.checkboxWrapper(type, input, inputHtml);
        break;
      case 'file':
        wrapper = this.fileWrapper(type, input, inputHtml);
        break;
      default:
        wrapper = this.defaultWrapper(type, input, inputHtml, selectOptions);
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

  private stateClass() {
    const { meta } = this.props;
    return { 'is-danger': meta.touched && meta.invalid };
  }
}
