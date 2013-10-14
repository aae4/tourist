class HomeController < ApplicationController
	before_filter :authenticate_user!, :except => [:index]

	def index
	 render :action => 'index'
	end

	def vkontakte
    vk = VkontakteApi::Client.new(ENV["VK_ACCESS_TOKEN"])
    @user = vk.users.get(uid: current_user.uid, fields: [:screen_name, :photo]).first
    @friends = vk.friends.get(fields: [:screen_name, :sex, :photo, :last_seen])
    @friends_online = @friends.select { |friend| friend.online == 1 }
		@groups = vk.groups.get(extended: 1)
    # первый элемент массива - кол-во групп; его нужно выкинуть
    @groups.shift
	end

	def send_vk_message
		vk = VkontakteApi::Client.new(ENV["VK_ACCESS_TOKEN"])
		vk.messages.send(user_id: params[:uid].to_s.to_i, chat_id: params[:uid].to_s.to_i, message: params[:message], access_token: 'fb4f0916b5812c42a78b2553e5c3ec019965d10b265ad8b704072c1cd19daa2f6a567bc36de27c7e7f7a3')
		#https://api.vk.com/method/messages.send?user_id=146281674&chat_id=216912310&message=Test&access_token=fb4f0916b5812c42a78b2553e5c3ec019965d10b265ad8b704072c1cd19daa2f6a567bc36de27c7e7f7a3
		render :js => "alert('successfully sended');"
	end

end
