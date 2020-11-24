'use strict';
(function () {
  var items = document.querySelectorAll('.questions__item');

  var moveAccordion = function (trgt) {
    var elemEvt = trgt;
    var questions = elemEvt.dataset.questions;

    if (elemEvt.classList.contains('open')) {
      document.querySelector('#' + questions).style.display = 'none';
      elemEvt.classList.remove('open');
    } else {
      document.querySelector('#' + questions).style.display = 'block';
      elemEvt.classList.toggle('open');
    }
  }

  var clickPressHandler = function (elem) {
    moveAccordion(elem.currentTarget);
  }

  var enterPressHandler = function (evt) {
    if (evt.key === 'Enter') {
      moveAccordion(evt.target);
    }
  }

  items.forEach(function (el) {
    el.addEventListener('click', clickPressHandler);
    el.addEventListener('keydown', enterPressHandler);
  });
})();
