class Diet < ActiveRecord::Base
	validates_presence_of :name
	validates_uniqueness_of :name

	acts_as_commentable
	
	belongs_to :user
	belongs_to :walk
	has_and_belongs_to_many :days
	accepts_nested_attributes_for :days, allow_destroy: true

	def self.find_by_params(params)
		diet = Diet.all
		diet = diet.where(:walk_id => params[:walk_id]) unless params[:walk_id].blank?
		diet = diet.order("created_at desc")
		#equipment_set = EquipmentSet.includes(:comments).order("comments.created_at desc")
		return diet
	end
end
