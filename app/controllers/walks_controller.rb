class WalksController < ApplicationController
	before_filter :authenticate_user!, :except => [:index, :show]

  def index
  	@walks = Walk.all
  end

  def new
  	@walk = Walk.new
  end

  def create
    @walk = Walk.new(walk_params)
    if @walk.save
      flash[:notice] = "Successfully created walk."
      redirect_to @walk
    else
      render :action => 'new'
    end
  end

  def edit
  	@walk = Walk.find(params[:id])
  end

  def update
    @walk = Walk.find(params[:id])
    if @walk.update_attributes(walk_params)
      flash[:notice] = "Successfully updated walk."
      redirect_to walk_url
    else
      render :action => 'edit'
    end
  end

  def show
  	@walk = Walk.find(params[:id])
  	@discussions = Discussion.find_by_params(:walk_id => @walk.id)
  end

  private
    def walk_params
      params.require(:walk).permit(:name, :user_id)
    end
end
