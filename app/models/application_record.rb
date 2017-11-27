class ApplicationRecord < ActiveRecord::Base
  self.abstract_class = true

  def fields_errors
    field_errors = []
    self.errors.each do |attr, msg|
      field_errors.push(FieldError.new(attr.to_s, msg))
    end
    field_errors
  end
end
