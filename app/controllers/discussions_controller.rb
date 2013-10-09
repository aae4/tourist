class DiscussionsController < ApplicationController
	before_filter :authenticate_user!, :except => [:index, :show]

  def index
  	@discussions = Discussion.find_by_params(params)
  end

  def new
  	@discussion = Discussion.new
  end

  def create
  	@discussion = Discussion.new(discussion_params)
    if @discussion.save
      flash[:notice] = "Successfully created discussion."
      redirect_to @discussion
    else
      render :action => 'new'
    end
  end

  def edit
  	@discussion = Discussion.find(params[:id])
  end

  def update
    @discussion = Discussion.find(params[:id])
    if @discussion.update_attributes(discussion_params)
      flash[:notice] = "Successfully updated discussion."
      redirect_to discussion_url
    else
      render :action => 'edit'
    end
  end

  def show
  	@discussion = Discussion.find(params[:id])
  	@comments = @discussion.comments
    #@new_comment = Comment.build_from(@discussion, current_user, "")
    @new_comment = Comment.new(:commentable => @discussion, :comment => "", :user => current_user)
  end

  def destroy
    @discussion = Discussion.find(params[:id])
    @discussion.destroy
    flash[:notice] = "Successfully destroyed discussion."
    redirect_to discussions_path
  end

  private
    def discussion_params
      params.require(:discussion).permit(:name, :text, :user_id, :walk_id)
    end
end
