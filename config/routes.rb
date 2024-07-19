Rails.application.routes.draw do
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  get '/', to: 'application#render_react', as: :root

  get '/create-account', to: 'application#render_react'
  # post '/api/create-account', to: 'users#create'
  get 'signup/*all', to: 'application#render_react', as: :signup

  namespace :api do
      resources :users, path: 'create-account', only: [:create]
  end
end
