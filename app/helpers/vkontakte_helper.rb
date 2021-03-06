module VkontakteHelper

	def online?(user)
    user.online == 1
  end
  
  def male?(user)
    user.sex == 2
  end
  
  def online_status(user)
    if online?(user)
      content_tag(:strong, 'онлайн')
    elsif user.last_seen? && user.last_seen.time > 0
       "был онлайн #{formatted_time_for(user.last_seen.time)}"
    end
  end
  
  def vk_url(user)
    "http://vk.com/#{user.screen_name}"
  end
  
  def formatted_time_for(timestamp)
    time = Time.at(timestamp)
  end
  
  # [durov|Павел Дуров] -> <a href="http://vk.com/durov" target="_blank">Павел Дуров</a>
  def render_links(text)
    text.gsub(/\[(?<screen_name>[^|]*)\|(?<text>.*)\]/, '<a href="http://vk.com/\k<screen_name>" target="_blank">\k<text></a>')
  end
  
  def avatar_for(source)
    if source.uid?
      source.photo_medium_rec
    else
      source.photo_medium
    end
  end
  
  def name_for(source)
    if source.uid?
      "#{source.first_name} #{source.last_name}"
    else
      source.name
    end
  end
end