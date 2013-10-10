class Walk < ActiveRecord::Base
	validates_presence_of :name
	validates_uniqueness_of :name

	belongs_to :user
	belongs_to :walk_type
	
	has_many :discussions
	has_many :equipment_sets
	has_many :diets
end
