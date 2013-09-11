class Equipment < ActiveRecord::Base
	belongs_to :equipment_type
	validates_presence_of :name

	mount_uploader :image, ImageUploader
end
