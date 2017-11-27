class FieldError < Struct.new(:field, :message)
  def self.error(msg)
    {messages: [FieldError.new("base", msg)]}
  end
end
