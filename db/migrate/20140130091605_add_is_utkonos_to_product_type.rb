class AddIsUtkonosToProductType < ActiveRecord::Migration
  def change
  	add_column :product_types, :is_utkonos, :boolean
  	add_column :product_types, :parent_id, :integer
  end
end
