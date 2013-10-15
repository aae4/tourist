class MealType < ActiveRecord::Base
	has_and_belongs_to_many :days

  has_many :meal_products
	has_many :products, :through => :meal_products

	accepts_nested_attributes_for :meal_products

	OPTIONS = [['breakfast', 'breakfast'], ['lunch', 'lunch'], ['nosh', 'nosh'], ['dinner', 'dinner'], ['handheld','handheld']]
	#validates_inclusion_of :meal_type, :in => OPTIONS
end
