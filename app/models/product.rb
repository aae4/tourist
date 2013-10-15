class Product < ActiveRecord::Base
	validates_presence_of :name
	validates_presence_of :product_type_id

	belongs_to :product_type
	has_many :meal_products
	has_many :meal_types, :through => :meal_products
end
