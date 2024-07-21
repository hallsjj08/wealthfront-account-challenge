Rails.application.routes.draw do
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html
  
  get '/', to: 'application#render_react', as: :root
  get '/create-account', to: 'application#render_react'
  get 'signup/*all', to: 'application#render_react', as: :signup

  namespace :api do
      resources :accounts, path: 'create-account', only: [:create]

      resources :sessions, only: [:create]
      delete :logout, to: "sessions#logout"
      get :logged_in, to: "sessions#logged_in", path: "logged-in"

      post :password_strength_scores, path: 'password-strength-scores', to: 'password_strength_scores#calculate_score'
  end

  match '*unmatched', to: 'application#render_react', via: :all
end
