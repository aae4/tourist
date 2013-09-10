class AddEquipmentTypeNameToEquipment < ActiveRecord::Migration
  def change
    add_column :equipment, :equipment_type_name, :string
  end
end
