class Painting < ActiveRecord::Base
	belongs_to :gallery
	mount_uploader :image, ImageUploader

	include Rails.application.routes.url_helpers
	#one convenient method to pass jq_upload the necessary information
  def to_jq_upload
    {
      "name" => read_attribute(:image),
      "size" => image.size,
      "url" => image.url,
      "thumbnail_url" => image.thumb.url,
      "delete_url" => gallery_path(:id => gallery_id),
      "delete_type" => "DELETE" 
    }
  end

end
