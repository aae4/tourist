class EquipmentController < ApplicationController
	respond_to :html, :js

	def index
		@equipment = Equipment.all
	end

	def new
		@equipment = Equipment.new
	end

	def edit
		@equipment = Equipment.find(params[:id])
	end

  def show
    @equipment = Equipment.find(params[:id])
    respond_to do |format|
    	format.html
    	format.js
    end
  end

  def get_by_type
    @equipment = EquipmentType.find(params[:type]).equipment
    respond_to do |format|
      format.js
    end
  end

  def create
    @equipment = Equipment.new(equipment_params)
    if @equipment.save
      flash[:notice] = "Successfully created equipment."
      redirect_to @equipment
    else
      render :action => 'new'
    end
  end

  def update
    @equipment = Equipment.find(params[:id])
    if @equipment.update_attributes(equipment_params)
      flash[:notice] = "Successfully updated equipment."
      redirect_to equipment_url
    else
      render :action => 'edit'
    end
  end

  def destroy
    @equipment = Equipment.find(params[:id])
    @equipment.destroy
    flash[:notice] = "Successfully destroyed equipment."
    redirect_to equipment_index_path
  end

  private
    def equipment_params
      params.require(:equipment).permit(:name, :description, :equipment_type_id, :equipment_type_name, :weight, :image)
    end
end
