function prepareList() {
  $('#expList').find('li:has(ul)')
  	.click( function(event) {
  		if (this == event.target) {
  			$(this).toggleClass('expanded');
  			$(this).children('ul').toggle('medium');
  		}
  		return false;
  	})
  	.addClass('collapsed')
  	.children('ul').hide();

  $('#dietExpList').find('li:has(ul)')
    .click( function(event) {
      if (this == event.target) {
        $(this).toggleClass('expanded');
        $(this).children('ul').toggle('medium');
      }
      return false;
    })
    .addClass('collapsed')
    .children('ul').hide();

  };
 
$(document).ready( function() {
    prepareList();
    //Create the button funtionality
	$('#expandList')
	.unbind('click')
	.click( function() {
	    $('.collapsed').addClass('expanded');
	    $('.collapsed').children().show('medium');
	})
	$('#collapseList')
	.unbind('click')
	.click( function() {
	    $('.collapsed').removeClass('expanded');
	    $('.collapsed').children().hide('medium');
	})
});

$('form a.add_fields, form a.remove_fields').live('click', function(){
  $(".dayNum").each(function(index, element) {
    //index starts with 0
    $(this).text("Day " + (index + 1));
  });
});