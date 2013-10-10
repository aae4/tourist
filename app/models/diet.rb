class Diet < ActiveRecord::Base
	belongs_to :user
	belongs_to :walk
end
