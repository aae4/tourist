class ProductType < ActiveRecord::Base
	validates_presence_of :name

	has_many :products
	scope :utkonos, :conditions => [" is_utkonos = 1 "]
	scope :basic, :conditions => [" is_utkonos is NULL "]

	has_many :children, class_name: "ProductType", foreign_key: "parent_id"
  belongs_to :parent, class_name: "ProductType"

  def self.roots
  	where("parent_id is null")
  end
end
