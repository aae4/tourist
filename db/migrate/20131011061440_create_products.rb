class CreateProducts < ActiveRecord::Migration
  def change
    create_table :products do |t|
      t.string :name
      t.string :kcals
      t.string :fats
      t.string :proteins
      t.string :carbohydrates
      t.integer :product_type_id

      t.timestamps
    end
  end
end
