class ProductTypesController < ApplicationController
	before_filter :authenticate_user!
	respond_to :html, :js

	def index
		@product_types = ProductType.all
	end

end
