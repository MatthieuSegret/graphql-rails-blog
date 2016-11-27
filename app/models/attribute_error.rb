class AttributeError < Struct.new(:attribute, :message)
  def self.error(msg)
    {errors: [AttributeError.new("base", msg)]}
  end
end
