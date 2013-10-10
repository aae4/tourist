class WalkType < ActiveRecord::Base
	has_many :walks
	validates_inclusion_of :walk_type, :in => ["hike", "water", "mountain", "ski"]
end
