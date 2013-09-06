# Place all the behaviors and hooks related to the matching controller here.
# All this logic will automatically be available in application.js.
# You can use CoffeeScript in this file: http://coffeescript.org/

$ ->
	$('.navbar a').click ->
		$('.navbar active').removeAttr("class")
		$(this).parent().attr("class", "active")
