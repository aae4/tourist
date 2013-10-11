class Discussion < ActiveRecord::Base
	belongs_to :user
	belongs_to :walk

	acts_as_commentable

	def self.find_by_params(params)
		discussions = Discussion.all
		discussions = discussions.where(:walk_id => params[:walk_id]) unless params[:walk_id].blank?
		discussions = discussions.includes(:comments).order("comments.created_at desc")
		return discussions
	end
end
