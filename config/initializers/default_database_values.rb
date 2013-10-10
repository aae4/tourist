if ActiveRecord::Base.connection.table_exists? 'walk_types'
	WalkType.create!(:name => "Hike", :walk_type => "hike") if !WalkType.find_by_walk_type("hike")
	WalkType.create!(:name => "Water", :walk_type => "water") if !WalkType.find_by_walk_type("water")
	WalkType.create!(:name => "Mountain", :walk_type => "mountain") if !WalkType.find_by_walk_type("mountain")
	WalkType.create!(:name => "Ski", :walk_type => "ski") if !WalkType.find_by_walk_type("ski")
end