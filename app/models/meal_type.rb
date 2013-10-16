class MealType < ActiveRecord::Base
	has_and_belongs_to_many :days

  has_many :meal_products
	has_many :products, :through => :meal_products

	accepts_nested_attributes_for :meal_products

	OPTIONS = [[I18n.t('breakfast'), 'breakfast'], [I18n.t('lunch'), 'lunch'], [I18n.t('nosh'), 'nosh'], [I18n.t('dinner'), 'dinner'], [I18n.t('handheld'),'handheld']]
	#validates_inclusion_of :meal_type, :in => OPTIONS
end
