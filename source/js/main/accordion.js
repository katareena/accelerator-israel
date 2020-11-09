'use strict';
(function () {
  var arrow = document.querySelectorAll('.questions__arrow');

  var moveAccordion = function (elem) {
    var btnTarget = elem.currentTarget;
    var questions = btnTarget.dataset.questions;
    console.log(1)
    if (btnTarget.classList.contains('open')) {
      console.log(2)
      document.querySelector('#' + questions).style.display = 'none';
      btnTarget.classList.remove('open');
    } else {
      console.log(3)
      document.querySelector('#' + questions).style.display = 'block';
      btnTarget.classList.toggle('open');
    }
  }

  arrow.forEach(function (el) {
    console.log(el)
    el.addEventListener('click', moveAccordion);
  });

})();
