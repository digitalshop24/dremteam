function initValid() {
	jQuery(function($){
  		$("#entry_1146935013").mask("+7 (999) 999-9999");
	});
}

function initSlider() {
    $(function () {
        $('.slider1').slick({
            infinite: true,
            speed: 300,
            fade: true,
            cssEase: 'linear',
            slidesToShow: 1,
            slidesToScroll: 1,
            arrows: false,
            asNavFor: '.slider2',
        });
        $('.slider2').slick({
            slidesToShow: 4,
            vertical: true,
            slidesToScroll: 1,
            dots: false,
            centerMode: true,
            focusOnSelect: true,
            arrows: true,
            asNavFor: '.slider1',
        });
    });
}