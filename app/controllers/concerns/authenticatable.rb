module Authenticatable
  def authenticate
    if request.headers["Authorization"].present?
      token   = request.headers.fetch("Authorization", "").split(" ").last
      payload = JsonWebToken.decode(token)
      @current_user = User.find(payload["sub"])
    end
  rescue ::JWT::ExpiredSignature => e
    render json: AttributeError.error("Auth token has expired")
  rescue ::JWT::DecodeError
    render json: AttributeError.error("Auth token is invalid")
  end

  def current_user
    @current_user
  end
end