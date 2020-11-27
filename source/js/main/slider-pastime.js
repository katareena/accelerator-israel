'use strict';
(function () {
  var MAX_WIDTH = 1023;
  var slideIndex = 1;

  showSlidesPastime(slideIndex);

  function plusSlide(evt) {
    evt.preventDefault();
    showSlidesPastime(slideIndex += 1);
  }

  function minusSlide(evt) {
    evt.preventDefault();
    showSlidesPastime(slideIndex -= 1);
  }

  function showSlidesPastime(n) {
    if(window.innerWidth <= MAX_WIDTH) {
      var i;
      var slides = document.getElementsByClassName('pastime__item');
      var dots = document.getElementsByClassName('pastime__dot');


      if (n > slides.length) {
        slideIndex = 1
      }
      if (n < 1) {
        slideIndex = slides.length
      }
      for (i = 0; i < slides.length; i++) {
        slides[i].style.display = 'none';
      }
      for (i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(' pastime__dot--activ', '');
      }
      slides[slideIndex - 1].style.display = 'flex';
      dots[slideIndex - 1].className += ' pastime__dot--activ';
    }
  }

  var xDown = null;
  var yDown = null;

  function getTouches(evt) {
    return evt.touches || evt.originalEvent.touches;
  };

  function handleTouchStart(evt) {
    const firstTouch = getTouches(evt)[0];
    xDown = firstTouch.clientX;
    yDown = firstTouch.clientY;
  };

  function handleTouchMove(evt) {
    if ( ! xDown || ! yDown ) {
      return;
    }

    var xUp = evt.touches[0].clientX;
    var yUp = evt.touches[0].clientY;

    var xDiff = xDown - xUp;
    var yDiff = yDown - yUp;

    if ( Math.abs( xDiff ) > Math.abs( yDiff ) ) {/*most significant*/
      if ( xDiff > 0 ) {
        /* left swipe */
        console.log('left');
        plusSlide(evt);
      } else {
        /* right swipe */
        console.log('right');
        minusSlide(evt);
      }
    } else {
      if ( yDiff > 0 ) {
        /* up swipe */
        console.log('up');
      } else {
        /* down swipe */
        console.log('down');
      }
    }
    /* reset values */
    xDown = null;
    yDown = null;
  };

  document.addEventListener('touchstart', handleTouchStart, false);
  document.addEventListener('touchmove', handleTouchMove, false);
})();
