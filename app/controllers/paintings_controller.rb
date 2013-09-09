class PaintingsController < ApplicationController
	def index
    @paintings = Painting.all

    respond_to do |format|
      format.html
      #format.json { render json: @paintings.map{|painting| painting.to_jq_upload } }
    end
	end

  def new
    @painting = Painting.new(:gallery_id => params[:gallery_id])
  end

  #def create
  #  @painting = Painting.new(painting_params)
  #  if @painting.save
  #    flash[:notice] = "Successfully created painting."
  #    redirect_to @painting.gallery
  #  else
  #    render :action => 'new'
  #  end
  #end

  def create
    @painting = Painting.new(painting_params)
    respond_to do |format|
      if !painting_params[:image].blank? && @painting.save
      	flash[:notice] = "Successfully created painting."
        format.html {
          #render :json => [@painting.to_jq_upload].to_json,
          redirect_to gallery_path(@painting.gallery),
          :content_type => 'text/html',
          :layout => false
        }
        format.json { render json: {files: [@painting.to_jq_upload]}, status: :created, location: @painting.gallery }
      else
        format.html { render action: "new" }
        format.json { render json: @painting.errors, status: :unprocessable_entity }
      end
    end
  end

  def edit
    @painting = Painting.find(params[:id])
  end

  def update
    @painting = Painting.find(params[:id])
    if @painting.update_attributes(painting_params)
      flash[:notice] = "Successfully updated painting."
      redirect_to @painting.gallery
    else
      render :action => 'edit'
    end
  end


  def destroy
    @painting = Painting.find(params[:id])
    @painting.destroy
    flash[:notice] = "Successfully destroyed painting."
    respond_to do |format|
      format.html { redirect_to galleries_url }
      format.json { head :no_content }
    end
  end

  private
    def painting_params
      params.require(:painting).permit(:name, :gallery_id, :image, :remote_image_url)
    end
end