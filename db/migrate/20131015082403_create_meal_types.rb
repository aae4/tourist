class CreateMealTypes < ActiveRecord::Migration
  def change
    create_table :meal_types do |t|
      t.string :name
      t.string :meal_type

      t.timestamps
    end
  end
end
