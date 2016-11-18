AttributeErrorType = GraphQL::ObjectType.define do
  name "AttributeError"
  description "Information about attribute that didn’t pass validation"

  # Expose fields from the model
  field :attribute, types.String, "Attribute name that caused these errors"
  field :message, !types.String,  "Validation message"
end
