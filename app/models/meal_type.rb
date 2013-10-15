class MealType < ActiveRecord::Base
	has_and_belongs_to_many :days

  has_many :meal_products
	has_many :products, :through => :meal_products

	accepts_nested_attributes_for :meal_products

	OPTIONS = [['Breakfast', 'breakfast'], ['Lunch', 'lunch'], ['Nosh', 'nosh'], ['Dinner', 'dinner'], ['Handheld','handheld']]
	validates_inclusion_of :name, :in => OPTIONS
end
