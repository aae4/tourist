class CreateWalks < ActiveRecord::Migration
  def change
    create_table :walks do |t|
      t.string :name
      t.integer :category
      t.integer :user_id
      t.integer :walk_type_id

      t.timestamps
    end
  end
end
