class ApplicationController < ActionController::Base
  protect_from_forgery with: :exception
  before_action :authenticate_user!

  protected

  def authenticate_admin_user!
    redirect_to(new_user_session_path) unless current_user.try(:admin?)
    authenticate_user!
  end

  def current_admin_user
    return nil unless current_user.try(:admin?)
    current_user
  end
end
