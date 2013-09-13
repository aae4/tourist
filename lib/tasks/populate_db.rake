namespace :db do
  desc "Fill database with sample equipment"
  task :populate => :environment do
		if ActiveRecord::Base.connection.table_exists? 'equipment'
			10.times do
				name = name = "Equipment#{rand(1000)}"
				id = EquipmentType.find_by_name("Страховочные системы (обвязки)").id
				Equipment.create!(:name => "#{name}", :equipment_type_id => id) if !Equipment.find_by_name(name)
			end
			10.times do
				name = "Equipment#{rand(1000)}"
				id = EquipmentType.find_by_name("Палатки").id
				Equipment.create!(:name => "#{name}", :equipment_type_id => id) if !Equipment.find_by_name(name)
			end
			10.times do
				name = "Equipment#{rand(1000)}"
				id = EquipmentType.find_by_name("Спальники").id
				Equipment.create!(:name => "#{name}", :equipment_type_id => id) if !Equipment.find_by_name(name)
			end
			10.times do
				name = "Equipment#{rand(1000)}"
				id = EquipmentType.find_by_name("Карабины").id
				Equipment.create!(:name => "#{name}", :equipment_type_id => id) if !Equipment.find_by_name(name)
			end
		end
 end
end