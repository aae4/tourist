class CreateEquipmentSets < ActiveRecord::Migration
  def change
    create_table :equipment_sets do |t|
      t.string :name
      t.integer :user_id
      t.integer :walk_id

      t.timestamps
    end
  end
end
