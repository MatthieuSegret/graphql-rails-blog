module Auth
  def self.protect(resolve)
    ->(obj, args, ctx) do
      if ctx[:current_user]
        resolve.call(obj, args, ctx)
      else
        FieldError.error("You need to sign in or sign up before continuing")
      end
    end
  end
end
