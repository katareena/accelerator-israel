'use strict';
(function () {
  var arrow = document.querySelectorAll('.questions__arrow');

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

  window.accordion = {
    moveAccordion: moveAccordion
  }

  arrow.forEach(function (el) {
    el.addEventListener('click', window.accordion.moveAccordion);
  });

})();
