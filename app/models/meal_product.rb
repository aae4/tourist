class MealProduct < ActiveRecord::Base
	belongs_to :meal_type
	belongs_to :product

	after_initialize :set_default_weight

	private
    def set_default_weight
      self.product_weight ||= 100.0 #will set the default value only if it's nil
    end
end
