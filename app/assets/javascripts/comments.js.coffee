# Place all the behaviors and hooks related to the matching controller here.
# All this logic will automatically be available in application.js.
# You can use CoffeeScript in this file: http://coffeescript.org/

jQuery ->
  # Create a comment
  $(".comment-form")
    .on "ajax:beforeSend", (evt, xhr, settings) ->
      $(this).find('textarea')
  #      .addClass('uneditable-input')
  #      .attr('disabled', 'disabled');
    .on "ajax:success", (evt, data, status, xhr) ->
      $(this).find('textarea')
        .removeClass('uneditable-input')
        .removeAttr('disabled', 'disabled')
        .val('');
      $(xhr.responseText).hide().insertBefore($('.comment-form').last()).show('slow')

  # Delete a comment
  $(document)
    .on "ajax:beforeSend", ".comment_msg", ->
      $(this).fadeTo('fast', 0.5)
    .on "ajax:success", ".comment_msg", ->
      $(this).hide('fast')
    .on "ajax:error", ".comment_msg", ->
      $(this).fadeTo('fast', 1)

  # Update votes
  $(document)
    .on "ajax:beforeSend", ".vote", ->
      $(this).fadeTo('fast', 0.5)
    .on "ajax:success", ".vote", ->
      $(this).fadeTo('fast', 1)
    .on "ajax:error", ".vote", ->
      $(this).fadeTo('fast', 1)