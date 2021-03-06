class EquipmentType < ActiveRecord::Base
	has_many :equipment

	validates_uniqueness_of :name
	validates_presence_of :name
end