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
});


function readURL(input) {
  if (input.files && input.files[0]) {
    var reader = new FileReader();

    reader.onload = function (e) {
      $('#img_prev').attr('src', e.target.result).width(150).height(150);
    };

    reader.readAsDataURL(input.files[0]);
  }
}