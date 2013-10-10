class CommentsController < ApplicationController

  def create
    @comment_hash = params[:comment]
    @obj = @comment_hash[:commentable_type].constantize.find(@comment_hash[:commentable_id])
    # Not implemented: check to see whether the user has permission to create a comment on this object
    #@comment = Comment.build_from(@obj, current_user, @comment_hash[:body])
    @comment = Comment.new(:commentable => @obj, :comment => @comment_hash[:comment], :user => current_user)
    if @comment.save
      render :partial => "comments/comment", :locals => { :comment => @comment }, :layout => false, :status => :created
    else
      render :js => "alert('error saving comment');"
    end
  end

  def destroy
    @comment = Comment.find(params[:id])
    if @comment.destroy
      render :json => @comment, :status => :ok
    else
      render :js => "alert('error deleting comment');"
    end
  end

  def upvote
    @comment = Comment.find(params[:id])
    @comment.liked_by current_user
    render "update_likes"
  end

  def downvote
    @comment = Comment.find(params[:id])
    @comment.downvote_from current_user
    render "update_likes"
  end

  private
    def comment_params
      params.require(:comment).permit(:comment, :commentable_id, :commentable_type)
    end
end
