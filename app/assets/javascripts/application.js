// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or vendor/assets/javascripts of plugins, if any, can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file.
//
// Read Sprockets README (https://github.com/sstephenson/sprockets#sprockets-directives) for details
// about supported directives.
//
//= require jquery
//= require jquery.ui.all
//= require jquery.turbolinks
//= require jquery_ujs
//= require jquery-fileupload
//= require twitter/bootstrap
//= require turbolinks
//= require_tree .

$(function () {
   /* $( ".equipment_type_select" ).autocomplete({
        source: "/equipment_types/suggestions",
        highlightItem: true,
        minLength: 0,
        messages: {
     	   noResults: '',
      	 results: function() {}
    		}
    })*/
  $.ui.autocomplete.prototype._renderItem = function( ul, item){
    var term = this.term.split(' ').join('|');
    var re = new RegExp("(" + term + ")", "gi") ;
    var t = item.label.replace(re,"<span style='font-size:16px;color:green'><b>$1</b></span>");
    return $( "<li></li>" )
       .data( "item.autocomplete", item )
       .append( "<a>" + t + "</a>" )
       .appendTo( ul );
  }
});


function readURL(input) {
  if (input.files && input.files[0]) {
    var reader = new FileReader();

    reader.onload = function (e) {
      $('#img_prev').attr('src', e.target.result)//.width(150).height(150);
    };

    reader.readAsDataURL(input.files[0]);
  }
}

$(function () {
  $('#avatar-upload-button').on('click', function (e) {
      $('#user_avatar').click();
      e.preventDefault();
  });
});

/*$(document).ready(function(){
  $('.navbar a').click(function (e) {
    $('.navbar .active').removeClass('active')
    $(this).parent('li').addClass('active')
  })
});*/

$(document).ready(function () {
  var url = window.location;
  $('ul.nav a[href="'+ url +'"]').parent().addClass('active');
  $('ul.nav a').filter(function() {
       return this.href == url;
  }).parent().addClass('active');
});

$(document).ready(function(){
  $("#flip").click(function(){
    $("#main-left-bar").slideToggle("slow");
  });
});