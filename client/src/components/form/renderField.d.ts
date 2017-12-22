export interface IFormInput {
  name: string;
  onBlur: (event?: any) => void;
  onChange: (event: any) => void;
  onFocus: (event?: any) => void;
  value: any;
}

export interface IMeta {
  active: boolean;
  dirty: boolean;
  error: boolean;
  initial: boolean;
  invalid: boolean;
  pristine: boolean;
  submitError: boolean;
  submitFailed: boolean;
  submitSucceeded: boolean;
  touched: boolean;
  valid: boolean;
  visited: boolean;
}

export interface IOption {
  label: string;
  value: string;
}
