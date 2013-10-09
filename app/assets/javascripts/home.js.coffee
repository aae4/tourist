# Place all the behaviors and hooks related to the matching controller here.
# All this logic will automatically be available in application.js.
# You can use CoffeeScript in this file: http://coffeescript.org/

$ ->
	$('.navbar a').click ->
		$('.navbar .active').removeClass('active')
		$(this).parent('li').addClass('active')

	$('.well a').click ->
		$(this).parent('li').addClass('active')