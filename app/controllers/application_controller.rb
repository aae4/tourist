class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  before_filter :configure_permitted_parameters, if: :devise_controller?
  protect_from_forgery with: :exception

  protected

  def configure_permitted_parameters
    #devise_parameter_sanitizer.for(:account_update) { |u| u.permit(:avatar) }
    devise_parameter_sanitizer.for(:account_update) << :avatar
    devise_parameter_sanitizer.for(:account_update) << :avatar_cache
    devise_parameter_sanitizer.for(:sign_up) << :avatar
    devise_parameter_sanitizer.for(:sign_up) << :avatar_cache
    #devise_parameter_sanitizer.for(:sign_up) { |u| u.permit(:avatar) }
  end
end
