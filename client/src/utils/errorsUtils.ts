// typings
import { ValidationMessage } from 'types';

export default function formatErrors(errors: Array<ValidationMessage>) {
  if (!errors || errors.length === 0) {
    return null;
  }
  const errorsFormatted: any = {};
  errors.forEach(error => {
    errorsFormatted[error.field || 'base'] = error.message;
  });
  return errorsFormatted;
}
