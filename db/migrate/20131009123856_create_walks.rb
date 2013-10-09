class CreateWalks < ActiveRecord::Migration
  def change
    create_table :walks do |t|
      t.string :name
      t.integer :user_id

      t.timestamps
    end
  end
end
