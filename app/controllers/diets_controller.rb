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
    if params[:edit_as_new]
      create_from_existing
    else
      @diet = Diet.find(params[:id])
      if @diet.update_attributes(diet_params)
        flash[:notice] = "Successfully updated diet."
        redirect_to diet_url
      else
        render :action => 'edit'
      end
    end
  end

  def create_from_existing
    @diet = Diet.new(:name => diet_params[:name], :user_id => diet_params[:user_id], :walk_id => diet_params[:walk_id])
    diet_params[:days_attributes].each_pair do |dkey, day_old|
      if day_old[:_destroy] == "false"
        day_new = Day.create(:name => day_old[:name])
        @diet.days << day_new
        (day_old[:meal_types_attributes]|| {}).each_pair do |mkey, meal_type_old|
            if meal_type_old[:_destroy] == "false"
              meal_type_new = MealType.create(:name => meal_type_old[:name], :meal_type => meal_type_old[:meal_type])
              day_new.meal_types << meal_type_new
              (meal_type_old[:meal_products_attributes] || {}).each_pair do |pkey, meal_product_old|
                if meal_product_old[:_destroy] == "false"
                  meal_product_new = MealProduct.create(:product_id => meal_product_old[:product_id],:product_weight => meal_product_old[:product_weight], :meal_type_id => meal_type_new.id)
                end
              end
            end
        end
      end
    end
    if @diet.save
      flash[:notice] = "Successfully created diet."
      redirect_to @diet
    else
      flash[:alert] = @diet.errors.to_a
      edit_as_new = params[:edit_as_new].blank? ? 0 : 1
      redirect_to edit_diet_path(params[:id], :walk_id => params[:walk_id], :edit_as_new => edit_as_new)
    end
  end

  def show
  	@diet = Diet.find(params[:id])
    @comments = @diet.comments
    @new_comment = Comment.new(:commentable => @diet, :comment => "", :user => current_user)
  end

  def destroy
    @diet = Diet.find(params[:id])
    @diet.destroy
    flash[:notice] = "Successfully destroyed diet."
    redirect_to diets_url
  end

  def get_products
    @products = Product.all
    @product_types = ProductType.all
    render "get_products"
  end

  private
    def diet_params
      params.require(:diet).permit(:name, :user_id, :walk_id, days_attributes: [:id, :name, :_destroy, meal_types_attributes: [:id, :name, :meal_type, :_destroy, meal_products_attributes: [:id, :product_id, :product_weight, :meal_type_id, :_destroy]] ])
    end
end
