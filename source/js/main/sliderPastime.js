'use strict';
(function () {
  var MAX_MOBILE_WIDTH = 767;
  var slideIndex = 1;

  showSlidesPastime(slideIndex);

  function plusSlide() {
    showSlidesPastime(slideIndex += 1);
  }

  function minusSlide() {
    showSlidesPastime(slideIndex -= 1);
  }

  function showSlidesPastime(n) {
    if(window.innerWidth <= MAX_MOBILE_WIDTH) {
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

  var prevBtn = document.querySelector('.pastime__prev');
  var nextBtn = document.querySelector('.pastime__next');

  prevBtn.addEventListener('click', minusSlide);
  nextBtn.addEventListener('click', plusSlide);

})();
