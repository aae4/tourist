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

  /*$('#dietExpList').find('li:has(ul)')
    .click( function(event) {
      if (this == event.target) {
        $(this).toggleClass('expanded');
        $(this).children('ul').toggle('medium');
      }
      return false;
    })
    .addClass('collapsed')
    .children('ul').hide();*/

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
    $(this).text(I18n.t("day") + " " + (index + 1));
    $(this).parent().find('.dayNumField').val(I18n.t("day") + " " + (index + 1));
  });
});




jQuery(document).ready(function(){
  $('#cc').combogrid({
      panelWidth:450,
      value:'006',
   
      idField:'id',
      textField:'value',
      url: "/products/suggestions",
      //colModel: [{'columnName':'id','width':'10','label':'id'}, {'columnName':'value','width':'45','label':'value'}],
      columns:[[
          {field:'id',title:'Id',width:60},
          {field:'value',title:'Value',width:100}
      ]]
  });
});