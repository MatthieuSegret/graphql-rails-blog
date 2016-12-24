Rails.application.routes.draw do
  root "application#index"
  post "/graphql", to: "graphql#create"

  scope defaults: { format: :json } do
    devise_for :users
  end

  ActiveAdmin.routes(self)

  if Rails.env.development?
    mount GraphiQL::Rails::Engine, at: "/graphiql", graphql_path: "/graphql"
  end

  get '*all', to: 'application#index'
end
