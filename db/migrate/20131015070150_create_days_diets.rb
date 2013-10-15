class CreateDaysDiets < ActiveRecord::Migration
  def change
    create_table :days_diets do |t|
      t.integer :day_id
      t.integer :diet_id
    end
  end
end
