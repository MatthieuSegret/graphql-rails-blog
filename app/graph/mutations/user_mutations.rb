module UserMutations
  SignUp = GraphQL::Relay::Mutation.define do
    name "signUp"
    description "Sign up"

    input_field :name, types.String
    input_field :email, types.String
    input_field :password, types.String
    input_field :password_confirmation, types.String

    return_field :token, types.String
    return_field :user, UserType
    return_field :errors, types[AttributeErrorType]

    resolve ->(obj, inputs, ctx) {
      user = User.new(inputs.to_params)

      if user.save
        ctx[:session][:refresh_token] = user.generate_refresh_token!
        user.update_tracked_fields(ctx[:request])
        { user: user, token: user.generate_jwt_token }
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

    resolve(Auth.protect ->(obj, inputs, ctx) {
      current_user = ctx[:current_user]

      if current_user.update(inputs.to_params)
        { user: current_user }
      else
        { errors: current_user.attributes_errors }
      end
    })
  end

  ChangePassword = GraphQL::Relay::Mutation.define do
    name "changePassword"
    description "Change user password"

    input_field :password, types.String
    input_field :password_confirmation, types.String
    input_field :current_password, types.String

    return_field :user, UserType
    return_field :errors, types[AttributeErrorType]

    resolve(Auth.protect ->(obj, inputs, ctx) {
      current_user = ctx[:current_user]
      params_with_password = inputs.to_h.symbolize_keys
      if current_user.update_with_password(params_with_password)
        { user: current_user }
      else
        { errors: current_user.attributes_errors }
      end
    })
  end

  CancelAccount = GraphQL::Relay::Mutation.define do
    name "cancelAccount"
    description "Cancel Account"

    return_field :errors, types[AttributeErrorType]

    resolve(Auth.protect ->(obj, inputs, ctx) {
      current_user = ctx[:current_user]
      #current_user.destroy
      ctx[:session][:refresh_token] = nil
      {}
    })
  end
end
