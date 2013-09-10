# Place all the behaviors and hooks related to the matching controller here.
# All this logic will automatically be available in application.js.
# You can use CoffeeScript in this file: http://coffeescript.org/

$ ->
	$('.show_all_suggests').click ->
		if !$('.ui-autocomplete.ui-widget:visible').length
			$( ".equipment_type_select" ).autocomplete( "search", "" );
		else
			$( ".equipment_type_select" ).autocomplete("close")

$ ->
  $( ".equipment_type_select" ).autocomplete
    minLength: 0
    source: (request, response) ->
      $.ajax
        url: "/equipment_types/suggestions"
        dataType: "json"
        data:
          term: request.term
        success: (data) ->
          response(data)
   	select: ( event, ui ) ->
   		$('#equipment_equipment_type_id').val(ui.item.id)