module Authenticatable
  def authenticate
    if request.headers["Authorization"].present?
      pattern = /^Bearer /
      header  = request.headers['Authorization']
      token = header.gsub(pattern, '') if header && header.match(pattern)

      if token.present?
        @current_user = User.find_by_access_token(token)

        if @current_user.nil?
          render json: FieldError.error("Auth token is invalid")
        end
      end
    end
  end

  def current_user
    @current_user
  end
end