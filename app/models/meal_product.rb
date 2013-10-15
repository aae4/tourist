class MealProduct < ActiveRecord::Base
	belongs_to :meal_type
	belongs_to :product
end
