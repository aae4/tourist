class AddImageToEquipment < ActiveRecord::Migration
  def change
    add_column :equipment, :image, :string
  end
end
