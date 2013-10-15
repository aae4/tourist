class CreateMealProducts < ActiveRecord::Migration
  def change
    create_table :meal_products do |t|
      t.integer :meal_type_id
      t.integer :product_id
      t.integer :product_weight

      t.timestamps
    end
  end
end
