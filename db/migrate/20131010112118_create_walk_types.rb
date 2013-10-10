class CreateWalkTypes < ActiveRecord::Migration
  def change
    create_table :walk_types do |t|
      t.string :name
      t.string :walk_type

      t.timestamps
    end
  end
end
