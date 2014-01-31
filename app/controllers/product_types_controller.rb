require "net/http"
require "uri"
require 'open-uri'
require "nokogiri"

class ProductTypesController < ApplicationController
	before_filter :authenticate_user!
	respond_to :html, :js

	def index
		@product_types = ProductType.basic
	end

end
