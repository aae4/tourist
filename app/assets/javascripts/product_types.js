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

  $('#dietExpList.expandable').find('li:has(ul)')
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
  turnOnListExpand();
  /*  prepareList();
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
	})*/
});

$('form a.add_fields, form a.remove_fields').live('click', function(){
  //alert($('input[value=' + 1 +'].diet_day_delete').size())
  i = 1;
  $(".dayNum").each(function(index, element) {
    //index starts with 0
    //alert($(this).parent().find('input').first().attr("value"));
    if ( $(this).parent().find('input').first().attr("value") == "false" ){
      /*$(this).text(I18n.t("day") + " " + (index + 1));
      $(this).parent().find('.dayNumField').val(I18n.t("day") + " " + (index + 1));*/
      $(this).text(I18n.t("day") + " " + (i));
      $(this).parent().find('.dayNumField').val(I18n.t("day") + " " + (i));
      i=i+1;
    }
  });
});

function turnOnListExpand() {
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

};