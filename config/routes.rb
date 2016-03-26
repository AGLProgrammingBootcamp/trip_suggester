Rails.application.routes.draw do

  root 'direction#create'
#  root 'finders#index'

#  get '/direction/hotels' => 'direction#hotels'
#  post '/direction/new' => 'direction#new'
# get '/direction/new' => 'direction#new'
#  post '/direction/show' => 'direction#show'
#  get '/direction/create' => 'direction#create'
#  post '/direction/search' => 'direction#search'

  resources :finders
  resources :onsens
end
