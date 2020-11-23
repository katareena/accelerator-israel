'use strict';
(function () {
  var items = document.querySelectorAll('.questions__item');
  var answers = document.querySelectorAll('.questions__elem-js');

  var moveAccordion = function (elem) {

    var btnTarget = elem.currentTarget;
    var questions = btnTarget.dataset.questions;

    if (btnTarget.classList.contains('open')) {
      document.querySelector('#' + questions).style.display = 'none';
      btnTarget.classList.remove('open');
    } else {
      document.querySelector('#' + questions).style.display = 'block';
      btnTarget.classList.toggle('open');
    }
  }


  // var enterPressHandler = function (evt) {
  //   if (evt.key === 'Enter') {
  //     for (var i = 0; i < items.length; i++) {
  //       var questions = items[i].dataset.questions;
  //       consol.log(evt.target);
  //       if (evt.target.dataset.questions === answers[i].id.indexOf('#' + questions)) {
  //         evt.target.classList.add('open');
  //         answers[i].style.display = 'block';
  //       } else {
  //         answers[i].style.display = 'none';
  //       }
  //     }
  //   }
  // };



  items.forEach(function (el) {
    el.addEventListener('click', moveAccordion);
    // el.addEventListener('keydown', enterPressHandler);
  });
})();
