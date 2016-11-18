class ApplicationRecord < ActiveRecord::Base
  self.abstract_class = true

  def attributes_errors
    attribute_errors = []
    self.errors.each do |attr, msg|
      attribute_errors.push(AttributeError.new(attr.to_s, msg))
    end
    attribute_errors
  end
end
