Tourist::Application.routes.draw do

  get "omniauth_callbacks/facebook"
  get "omniauth_callbacks/vkontakte"
  get "paintings/index"
  get "paintings/new"
  get "paintings/edit"
  get "galleries/index"
  get "galleries/new"
  get "galleries/edit"

  get "home/about"
  get "home/slide_tabs"
  get "home/vkontakte"

  get "equipment_types/suggestions"
  get "equipment/create_set"
  get "equipment/get_by_type"

  get "products/suggestions"
  get "product/get_by_type"

  get "diets/get_products"

  #devise_for :users
  devise_for :users, :controllers => { :omniauth_callbacks => "users/omniauth_callbacks" }

  resources :comments, :only => [:create, :update, :destroy]
  resources :comments do
    member do
      put "like", to: "comments#upvote"
      put "dislike", to: "comments#downvote"
    end
  end
  post 'home/send_vk_message', :as => "send_msg"

  resources :home
  resources :walks
  resources :discussions
  resources :product_types, :only => [:index]
  resources :product_types do
    get "get_products", to: "product_types#get_products"
    #member do
      #get "get_products", to: "product_types#get_products"
    #end
  end
  resources :equipment_sets
  resources :diets
  resources :personal_cabinet
  resources :equipment
  resources :equipment_types
  resources :galleries
  resources :paintings
  # The priority is based upon order of creation: first created -> highest priority.
  # See how all your routes lay out with "rake routes".

  # You can have the root of your site routed with "root"
  root 'home#index'

  # Example of regular route:
  #   get 'products/:id' => 'catalog#view'

  # Example of named route that can be invoked with purchase_url(id: product.id)
  #   get 'products/:id/purchase' => 'catalog#purchase', as: :purchase

  # Example resource route (maps HTTP verbs to controller actions automatically):
  #   resources :products

  # Example resource route with options:
  #   resources :products do
  #     member do
  #       get 'short'
  #       post 'toggle'
  #     end
  #
  #     collection do
  #       get 'sold'
  #     end
  #   end

  # Example resource route with sub-resources:
  #   resources :products do
  #     resources :comments, :sales
  #     resource :seller
  #   end

  # Example resource route with more complex sub-resources:
  #   resources :products do
  #     resources :comments
  #     resources :sales do
  #       get 'recent', on: :collection
  #     end
  #   end
  
  # Example resource route with concerns:
  #   concern :toggleable do
  #     post 'toggle'
  #   end
  #   resources :posts, concerns: :toggleable
  #   resources :photos, concerns: :toggleable

  # Example resource route within a namespace:
  #   namespace :admin do
  #     # Directs /admin/products/* to Admin::ProductsController
  #     # (app/controllers/admin/products_controller.rb)
  #     resources :products
  #   end
end
