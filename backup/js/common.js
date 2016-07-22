// window.onload = function() {
//    $('#preload').addClass('hidden');
// };
$(document).ready(function() {
      $("[data-toggle]").click(function() {
        var toggle_el = $(this).data("toggle");
        $(toggle_el).toggleClass("open-sidebar");
        $(body).toggleClass("noScroll");
       // body.classList.toggleClass("noScroll");
        //console.log( body.classList.contains("noScroll") );
      });


      // $('#preload').addClass('hidden');

});

$(document).click(function(e){
    if ($(e.target).parents().filter('#menu_size:visible').length != 1) {
        $('#menu_size').removeClass("open-sidebar");
        $(body).removeClass("noScroll");
    }
});

$('#li_menu').click(function(){
  	$('#menu_size').removeClass("open-sidebar");
    $(body).removeClass("noScroll");
});

