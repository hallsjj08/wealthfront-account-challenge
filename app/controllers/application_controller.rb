class ApplicationController < ActionController::Base
  skip_before_action :verify_authenticity_token
  def render_react
    react
  end

  private

  def react
    render layout: 'application', template: 'vite/index'
  end
end
