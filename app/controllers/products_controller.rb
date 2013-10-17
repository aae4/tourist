class ProductsController < ApplicationController
	respond_to :html, :js

	def suggestions
  	suggests = Product.all
  	term = Regexp.escape(params[:term] || "")
  	suggests = suggests.select("*").where("name LIKE ?", "%#{term}%")#.map{|q| [q.name, q.id]}.sort
  	suggests = suggests.collect do |t|
      { label: t.name, category: ProductType.find(t.product_type_id).name, desc: "#{t.kcals}/#{t.proteins}/#{t.fats}/#{t.carbohydrates}"}
    end
  	render json: suggests
  end
end
# kcals: "76", fats: "0", proteins: "3.5", carbohydrates: "15
