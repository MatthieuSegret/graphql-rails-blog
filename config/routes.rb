Rails.application.routes.draw do
  post "/graphql", to: "graphql#create"
  ActiveAdmin.routes(self)
  devise_for :users
end
