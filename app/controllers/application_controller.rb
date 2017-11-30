class ApplicationController < ActionController::Base
  include Authenticatable
  before_action :authenticate

  def index
    render file: 'public/index.html'
  end
end
