module UserMutations
  SignUp = GraphQL::Relay::Mutation.define do
    name "signUp"
    description "Sign up"

    input_field :name, types.String
    input_field :email, types.String
    input_field :password, types.String
    input_field :password_confirmation, types.String

    return_field :user, UserType
    return_field :errors, types[AttributeErrorType]

    resolve -> (obj, inputs, ctx) {
      user = User.new(inputs.to_params)

      if user.save
        { user: user }
      else
        { errors: user.attributes_errors }
      end
    }
  end
end
