class CreateDaysMealTypes < ActiveRecord::Migration
  def change
    create_table :days_meal_types do |t|
      t.integer :day_id
      t.integer :meal_type_id
    end
  end
end
