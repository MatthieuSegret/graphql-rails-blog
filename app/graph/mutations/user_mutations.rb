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
        warden = ctx[:warden]
        scope = Devise::Mapping.find_scope!(user)
        if warden.user(scope) != user
          warden.set_user(user, scope: scope)
        end
        { user: user }
      else
        { errors: user.attributes_errors }
      end
    }
  end

  Update = GraphQL::Relay::Mutation.define do
    name "updateUser"
    description "Update user"

    input_field :name, types.String
    input_field :email, types.String

    return_field :user, UserType
    return_field :errors, types[AttributeErrorType]

    resolve(Auth.protect -> (obj, inputs, ctx) {
      current_user = ctx[:current_user]

      if current_user.update(inputs.to_params)
        { user: current_user }
      else
        { errors: current_user.attributes_errors }
      end
    })
  end
end
