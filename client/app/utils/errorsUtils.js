export default function formatErrors(errors) {
  if (!errors) { return null; }
  const errorsFormatted = {};
  errors.forEach(error => {
    errorsFormatted[error.attribute] = error.message;
  });
  return errorsFormatted;
}
