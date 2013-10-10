class CreateDiets < ActiveRecord::Migration
  def change
    create_table :diets do |t|
      t.string :name
      t.integer :user_id
      t.integer :walk_id

      t.timestamps
    end
  end
end
