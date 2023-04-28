window.onload = function(){
  const name = document.querySelector("h1");
  animate(name);
}

function animate(element){
  const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  let iterations = 0;

  const interval = setInterval(() => {
    element.innerText = element.innerText.split("")
    .map((letter, index) => {
      if(index < iterations){
        return element.dataset.value[index];
      }
      return letters[Math.floor(Math.random() * 26)]
    })
    .join("");

    if(iterations >= element.dataset.value.length) clearInterval(interval);

    iterations += 1 / 3;
  }, 20);
}

//Slider functionality
jQuery(function($){
  var $slider = $('.emSlideshow .slider'),
    maxItems = $('.item', $slider).length,
    dragging = false,
    tracking,
    rightTracking;

  $sliderRight = $('.emSlideshow').clone().addClass('emSlideshow-right').appendTo($('.split-slideshow'));

  rightItems = $('.item', $sliderRight).toArray();
  reverseItems = rightItems.reverse();
  $('.slider', $sliderRight).html('');
  for (i = 0; i < maxItems; i++) {
    $(reverseItems[i]).appendTo($('.slider', $sliderRight));
  }

  $slider.addClass('emSlideshow-left');
  $('.emSlideshow-left').slick({
    vertical: true,
    verticalSwiping: true,
    arrows: false,
    infinite: true,
    dots: true,
    speed: 1000,
    cssEase: 'cubic-bezier(0.7, 0, 0.3, 1)'
  }).on('beforeChange', function(event, slick, currentSlide, nextSlide) {

    if (currentSlide > nextSlide && nextSlide == 0 && currentSlide == maxItems - 1) {
      $('.emSlideshow-right .slider').slick('slickGoTo', -1);
      $('.emSlideshow-text').slick('slickGoTo', maxItems);
    } else if (currentSlide < nextSlide && currentSlide == 0 && nextSlide == maxItems - 1) {
      $('.emSlideshow-right .slider').slick('slickGoTo', maxItems);
      $('.emSlideshow-text').slick('slickGoTo', -1);
    } else {
      $('.emSlideshow-right .slider').slick('slickGoTo', maxItems - 1 - nextSlide);
      $('.emSlideshow-text').slick('slickGoTo', nextSlide);
    }
  }).on("mousewheel", function(event) {
    event.preventDefault();
    if (event.deltaX > 0 || event.deltaY < 0) {
      $(this).slick('slickNext');
    } else if (event.deltaX < 0 || event.deltaY > 0) {
      $(this).slick('slickPrev');
    };
  }).on('mousedown touchstart', function(){
    dragging = true;
    tracking = $('.slick-track', $slider).css('transform');
    tracking = parseInt(tracking.split(',')[5]);
    rightTracking = $('.emSlideshow-right .slick-track').css('transform');
    rightTracking = parseInt(rightTracking.split(',')[5]);
  }).on('mousemove touchmove', function(){
    if (dragging) {
      newTracking = $('.emSlideshow-left .slick-track').css('transform');
      newTracking = parseInt(newTracking.split(',')[5]);
      diffTracking = newTracking - tracking;
      $('.emSlideshow-right .slick-track').css({'transform': 'matrix(1, 0, 0, 1, 0, ' + (rightTracking - diffTracking) + ')'});
    }
  }).on('mouseleave touchend mouseup', function(){
    dragging = false;
  });

  $('.emSlideshow-right .slider').slick({
    swipe: false,
    vertical: true,
    arrows: false,
    infinite: true,
    speed: 950,
    cssEase: 'cubic-bezier(0.7, 0, 0.3, 1)',
    initialSlide: maxItems - 1
  });
  $('.emSlideshow-text').slick({
    swipe: false,
    vertical: true,
    arrows: false,
    infinite: true,
    speed: 900,
    cssEase: 'cubic-bezier(0.7, 0, 0.3, 1)'
  });




  var printText = $('.codeText').data('text');

  var contentArray = printText.split('/n');
  $.each(contentArray, function(index, newLine) {
    $('.codeText').append('<span style="display:block;" id="'+index+'"></span>');

    var lineID = index;
    var self = $(this);
      setTimeout(function () {
        $.each(self, function(index, chunk){
            setTimeout(function () {
              $('#'+lineID).append("<span>"+chunk+"</span>");
              $('body, html').scrollTop($(document).height());
            }, index*5);
        });

      }, index*100);
  });






});
