class ProductsController < ApplicationController
	respond_to :html, :js

	def suggestions
  	suggests = Product.all
  	term = Regexp.escape(params[:term] || "")
  	suggests = suggests.select("name, id").where("name LIKE ?", "%#{term}%")#.map{|q| [q.name, q.id]}.sort
  	suggests = suggests.collect do |t|
      { id: t.id, value: t.name }
    end
  	render json: suggests
  end
end
