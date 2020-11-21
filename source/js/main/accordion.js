'use strict';
(function () {
  var items = document.querySelectorAll('.questions__item');

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

  items.forEach(function (el) {
    el.addEventListener('click', moveAccordion);
  });

})();
