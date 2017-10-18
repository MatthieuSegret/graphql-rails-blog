module AuthMutations
  SignIn = GraphQL::Relay::Mutation.define do
    name "signIn"
    description "SignIn"

    input_field :email, types.String
    input_field :password, types.String

    return_field :token, types.String
    return_field :refresh_token, types.String
    return_field :errors, types[AttributeErrorType]

    resolve ->(obj, inputs, ctx) {
      user = User.find_by(email: inputs[:email])
      if user.present? && user.valid_password?(inputs[:password])
        ctx[:session][:refresh_token] = user.generate_refresh_token!        
        { token: user.generate_jwt_token, refresh_token: user.refresh_token }
      else
        AttributeError.error("Invalid email or password")
      end
    }
  end

  RefreshToken = GraphQL::Relay::Mutation.define do
    name "refreshToken"
    description "Refresh Token"

    input_field :refresh_token, types.String

    return_field :token, types.String
    return_field :errors, types[AttributeErrorType]

    resolve ->(obj, inputs, ctx) {
      refresh_token = ctx[:session][:refresh_token] || inputs[:refresh_token]
      user = refresh_token.present? ? User.find_by(refresh_token: refresh_token) : nil
      if user.present?
        { token: user.generate_jwt_token }
      else
        AttributeError.error("Invalid refresh token")
      end
    }
  end

  RevokeRefreshToken = GraphQL::Relay::Mutation.define do
    name "revokeRefreshToken"
    description "revoke refresh token"
    return_field :errors, types[AttributeErrorType]

    resolve(Auth.protect ->(obj, inputs, ctx) {
      current_user, session, warden = ctx[:current_user], ctx[:session], ctx[:warden]
      warden.logout
      session[:refresh_token] = nil      
      current_user.update(refresh_token: nil) if current_user.present?
      {}
    })
  end
end