class DietsController < ApplicationController
	before_filter :authenticate_user!, :except => [:index, :show]

  def index
  	@diets = Diet.all
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
      params.require(:diet).permit(:name, :user_id, :walk_id)
    end
end