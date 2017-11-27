FieldErrorType = GraphQL::ObjectType.define do
  name "FieldError"
  description "Information about field that didn’t pass validation"

  # Expose fields from the model
  field :field, types.String, "Field name that caused these errors"
  field :message, !types.String,  "Validation message"
end
