Rails.application.routes.draw do

#  root 'direction#create'
   root 'direction#start'
#  root 'finders#index'

  get '/direction/hotels' => 'direction#hotels'
  post '/direction/new' => 'direction#new'
  get '/direction/new' => 'direction#new'
  post '/direction/show' => 'direction#show'
  get '/direction/create' => 'direction#create'
  post '/direction/search' => 'direction#search'
  get '/direction/start' => 'direction#start'
  post '/direction/hotels' => 'direction#hotels'
  get '/direction/graph' => 'direction#graph'

  resources :finders
  resources :onsens
end
