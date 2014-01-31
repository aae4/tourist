class AddUtkonosFieldsToProduct < ActiveRecord::Migration
  def change
  	add_column :products, :is_utkonos, :boolean
  	add_column :products, :description, :text
  	add_column :products, :price, :string
  	add_column :products, :link, :string
  end
end
