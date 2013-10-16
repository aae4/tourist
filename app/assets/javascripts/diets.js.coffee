# Place all the behaviors and hooks related to the matching controller here.
# All this logic will automatically be available in application.js.
# You can use CoffeeScript in this file: http://coffeescript.org/

jQuery ->
  $('form').on 'click', '.remove_fields', (event) ->
    $(this).prev('input[type=hidden]').val('1')
    #$(this).closest('fieldset').hide()
    $(this).closest('fieldset').remove()
    event.preventDefault()

  $('form').on 'click', '.add_fields', (event) ->
    time = new Date().getTime()
    regexp = new RegExp($(this).data('id'), 'g')
    $(this).before($(this).data('fields').replace(regexp, time))
    event.preventDefault()

  $('.choose_product').click ->
  	$('.new_product_field.active .add_fields').click()

  	#$('.new_product_field.active .product_weight').last().text($(this).parent().parent().attr('pid'))
  	#$('.new_product_field.active .product_id_field').last().text($(this).parent().parent().attr('pid'))
  	$('.new_product_field.active .pname').last().text($(this).parent().parent().attr('pname'))
  	$('.new_product_field.active .pkcals').last().text($(this).parent().parent().attr('pkcals'))
  	$('.new_product_field.active .pproteins').last().text($(this).parent().parent().attr('pproteins'))
  	$('.new_product_field.active .pfats').last().text($(this).parent().parent().attr('pfats'))
  	$('.new_product_field.active .pcarbohydrates').last().text($(this).parent().parent().attr('pcarbohydrates'))
  	$('.new_product_field.active .product_id_field').last().val($(this).parent().parent().attr('pid'))

  	$('#addProductModal').modal('hide')
  	$('.new_product_field.active').removeClass('active')

 	$('form').on 'click', '.addProductModalOpen', (event) ->
 		$('#addProductModal').modal('show')
 		$(this).parent().find('.new_product_field').addClass('active')
 		event.preventDefault()

$ ->
  $( ".product_search" ).autocomplete
    minLength: 0
    source: (request, response) ->
      $.ajax
        url: "/products/suggestions"
        dataType: "json"
        data:
          term: request.term
        success: (data) ->
          response(data)
   	select: ( event, ui ) ->
   		$('#product_id').val(ui.item.id)
   		$.ajax
        url: "/product/get_by_id"
        data:
          type: ui.item.id