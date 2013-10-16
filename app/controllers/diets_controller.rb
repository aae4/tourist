class DietsController < ApplicationController
	before_filter :authenticate_user!, :except => [:index, :show]

  def index
  	@diets = Diet.find_by_params(params)
  end

  def new
  	@diet = Diet.new
  end

  def create
    @diet = Diet.new(diet_params)
    if @diet.save
      flash[:notice] = "Successfully created diet."
      redirect_to @diet
    else
      render :action => 'new'
    end
  end

  def edit
  	@diet = Diet.find(params[:id])
  end

  def update
    @diet = Diet.find(params[:id])
    if @diet.update_attributes(diet_params)
      flash[:notice] = "Successfully updated diet."
      redirect_to diet_url
    else
      render :action => 'edit'
    end
  end

  def show
  	@diet = Diet.find(params[:id])
  end

  private
    def diet_params
      params.require(:diet).permit(:name, :user_id, :walk_id, days_attributes: [:id, :name,  meal_types_attributes: [:id, :name, :meal_type, meal_products_attributes: [:id, :product_id, :product_weight, :meal_type_id]] ])
    end
end
