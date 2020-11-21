'use strict';
(function () {
  var slideIndex = 1;

  showSlidesFeedback(slideIndex);

  function nextSlide(evt) {
    evt.preventDefault();
    showSlidesFeedback(slideIndex += 1);
  }

  function prevSlide(evt) {
    evt.preventDefault();
    showSlidesFeedback(slideIndex -= 1);
  }

  function showSlidesFeedback(n) {

      var i;
      var slides = document.getElementsByClassName('feedback__slide');
      var numberValue = document.querySelector('.feedback__number');
      var totalValue = document.querySelector('.feedback__total');

      if (n > slides.length) {
        slideIndex = 1
        numberValue.textContent = 1;
        totalValue.textContent = slides.length;
      }
      if (n < 1) {
          slideIndex = slides.length
      }
      for (i = 0; i < slides.length; i++) {
          slides[i].style.display = 'none';
      }

      slides[slideIndex - 1].style.display = 'block';
      numberValue.textContent = slideIndex;
      totalValue.textContent = slides.length;
  }

  var prevBtnFdb = document.querySelector('.feedback__arrow-prev');
  var nextBtnFdb = document.querySelector('.feedback__arrow-next');

  prevBtnFdb.addEventListener('click', prevSlide);
  nextBtnFdb.addEventListener('click', nextSlide);
})();
