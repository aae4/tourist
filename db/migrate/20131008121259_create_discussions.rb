class CreateDiscussions < ActiveRecord::Migration
  def change
    create_table :discussions do |t|
      t.string :name
      t.text :text
      t.integer :user_id
      t.integer :walk_id
      
      t.timestamps
    end
  end
end
