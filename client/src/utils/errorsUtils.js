export default function formatErrors(errors) {
  if (!errors || errors.length === 0) {
    return null;
  }
  const errorsFormatted = {};
  errors.forEach(error => {
    errorsFormatted[error.field || 'base'] = error.message;
  });
  return errorsFormatted;
}
