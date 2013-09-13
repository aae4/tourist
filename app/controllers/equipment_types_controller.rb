class EquipmentTypesController < ApplicationController
	respond_to :html, :js

	def index
		@equipment_types = EquipmentType.all
	end

	def new
		@equipment_type = EquipmentType.new
	end

	def edit
		@equipment_type = EquipmentType.find(params[:id])
	end

  def show
    @equipment_type = EquipmentType.find(params[:id])
    respond_to do |format|
    	format.html
    	format.js
    end
  end

  def create
    @equipment_type = EquipmentType.new(equipment_type_params)
    if @equipment_type.save
      flash[:notice] = "Successfully created equipment_type."
      redirect_to @equipment_type
    else
      render :action => 'new'
    end
  end

  def update
    @equipment_type = EquipmentType.find(params[:id])
    if @equipment_type.update_attributes(equipment_type_params)
      flash[:notice] = "Successfully updated equipment_type."
      redirect_to equipment_type_url
    else
      render :action => 'edit'
    end
  end

  def destroy
    @equipment_type = EquipmentType.find(params[:id])
    @equipment_type.destroy
    flash[:notice] = "Successfully destroyed equipment_type."
    redirect_to equipment_types_url
  end

  def suggestions
  	suggests = EquipmentType.all
  	term = Regexp.escape(params[:term] || "")
  	suggests = suggests.select("name, id").where("name ILIKE ?", "%#{term}%")#.map{|q| [q.name, q.id]}.sort
  	suggests = suggests.collect do |t|
      { id: t.id, value: t.name + " (#{EquipmentType.find(t.id).equipment.count})" }
    end
  	render json: suggests
  end

  private
    def equipment_type_params
      params.require(:equipment_type).permit(:name)
    end
end
