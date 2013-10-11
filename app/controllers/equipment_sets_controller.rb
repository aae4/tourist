class EquipmentSetsController < ApplicationController
	before_filter :authenticate_user!, :except => [:index, :show]

  def index
  	@equipment_sets = EquipmentSet.find_by_params(params)
  end

  def new
  	@equipment_set = EquipmentSet.new
  end

  def create
    @equipment_set = EquipmentSet.new(equipment_set_params)
    if @equipment_set.save
      flash[:notice] = "Successfully created equipment_set."
      redirect_to @equipment_set
    else
      render :action => 'new'
    end
  end

  def edit
  	@equipment_set = EquipmentSet.find(params[:id])
  end

  def update
    @equipment_set = EquipmentSet.find(params[:id])
    if @equipment_set.update_attributes(equipment_set_params)
      flash[:notice] = "Successfully updated equipment_set."
      redirect_to equipment_set_url
    else
      render :action => 'edit'
    end
  end

  def show
  	@equipment_set = EquipmentSet.find(params[:id])
  end

  private
    def equipment_set_params
      params.require(:equipment_set).permit(:name, :user_id, :walk_id)
    end
end
