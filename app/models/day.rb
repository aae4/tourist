class Day < ActiveRecord::Base
	has_and_belongs_to_many :diets
	has_and_belongs_to_many :meal_types
	accepts_nested_attributes_for :meal_types, allow_destroy: true
end
