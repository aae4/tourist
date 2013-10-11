class EquipmentSet < ActiveRecord::Base
	validates_presence_of :name
	validates_uniqueness_of :name

	belongs_to :user
	belongs_to :walk

	def self.find_by_params(params)
		equipment_set = EquipmentSet.all
		equipment_set = equipment_set.where(:walk_id => params[:walk_id]) unless params[:walk_id].blank?
		equipment_set = equipment_set.order("created_at desc")
		#equipment_set = EquipmentSet.includes(:comments).order("comments.created_at desc")
		return equipment_set
	end
end
