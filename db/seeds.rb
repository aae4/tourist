# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

#basic_equipment_types
# encoding: utf-8
if ActiveRecord::Base.connection.table_exists? 'equipment_types'
	EquipmentType.create!(:name => "Страховочные системы (обвязки)") if !EquipmentType.find_by_name("Страховочные системы (обвязки)")
	EquipmentType.create!(:name => "Веревки, репшнуры") if !EquipmentType.find_by_name("Веревки, репшнуры")
	EquipmentType.create!(:name => "Скальные туфли") if !EquipmentType.find_by_name("Скальные туфли")
	EquipmentType.create!(:name => "Карабины") if !EquipmentType.find_by_name("Карабины")
	EquipmentType.create!(:name => "Спусковые и страховочные устройства") if !EquipmentType.find_by_name("Спусковые и страховочные устройства")
	EquipmentType.create!(:name => "Зажимы для веревки") if !EquipmentType.find_by_name("Зажимы для веревки")
	EquipmentType.create!(:name => "Оттяжки, петли, самостраховки, лесенки") if !EquipmentType.find_by_name("Оттяжки, петли, самостраховки, лесенки")
	EquipmentType.create!(:name => "Ледорубы, ледовые инструменты") if !EquipmentType.find_by_name("Ледорубы, ледовые инструменты")
	EquipmentType.create!(:name => "Налобные фонари") if !EquipmentType.find_by_name("Налобные фонари")
	EquipmentType.create!(:name => "Альпинистские кошки") if !EquipmentType.find_by_name("Альпинистские кошки")
	EquipmentType.create!(:name => "Каски альпинистские, скалолазные, ледолазные") if !EquipmentType.find_by_name("Каски альпинистские, скалолазные, ледолазные")
	EquipmentType.create!(:name => "Блоки, ролики") if !EquipmentType.find_by_name("Блоки, ролики")
	EquipmentType.create!(:name => "Магнезия, мешочки") if !EquipmentType.find_by_name("Магнезия, мешочки")
	EquipmentType.create!(:name => "Альпинистская оптика") if !EquipmentType.find_by_name("Альпинистская оптика")
	EquipmentType.create!(:name => "Снаряжение для промышленного альпинизма") if !EquipmentType.find_by_name("Снаряжение для промышленного альпинизма")
	EquipmentType.create!(:name => "Закладные элементы, ИТО") if !EquipmentType.find_by_name("Закладные элементы, ИТО")
	EquipmentType.create!(:name => "Снегоступы") if !EquipmentType.find_by_name("Снегоступы")
	EquipmentType.create!(:name => "Телескопические палки") if !EquipmentType.find_by_name("Телескопические палки")
	EquipmentType.create!(:name => "Шлямбурное оборудование") if !EquipmentType.find_by_name("Шлямбурное оборудование")
	EquipmentType.create!(:name => "Снаряжение для спелеологии") if !EquipmentType.find_by_name("Снаряжение для спелеологии")
	EquipmentType.create!(:name => "Снаряжение для спелеологии") if !EquipmentType.find_by_name("Снаряжение для спелеологии")
	EquipmentType.create!(:name => "Ледобуры") if !EquipmentType.find_by_name("Ледобуры")
	EquipmentType.create!(:name => "Крючья скальные") if !EquipmentType.find_by_name("Крючья скальные")
	EquipmentType.create!(:name => "Молотки скальные") if !EquipmentType.find_by_name("Молотки скальные")
	EquipmentType.create!(:name => "Аксессуары к альпснаряжению") if !EquipmentType.find_by_name("Аксессуары к альпснаряжению")
	EquipmentType.create!(:name => "Аксессуары к скальному оборудованию") if !EquipmentType.find_by_name("Аксессуары к скальному оборудованию")
	EquipmentType.create!(:name => "Веревки") if !EquipmentType.find_by_name("Веревки")
	EquipmentType.create!(:name => "Палатки") if !EquipmentType.find_by_name("Палатки")
	EquipmentType.create!(:name => "Спальники") if !EquipmentType.find_by_name("Спальники")
end
if ActiveRecord::Base.connection.table_exists? 'equipment'
	while Equipment.count < 40
		name = "Carabin#{rand(1000)}"
		Equipment.create!(:name => "#{name}", :equipment_type_id => 7) if !Equipment.find_by_name(name)
	end
end