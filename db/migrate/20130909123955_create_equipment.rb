class CreateEquipment < ActiveRecord::Migration
  def change
    create_table :equipment do |t|
      t.string :name
      t.text :description
      t.integer :equipment_type_id
      t.decimal :weight

      t.timestamps
    end
  end
end
