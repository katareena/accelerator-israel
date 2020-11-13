'use strict';
(function () {
  var getReadyPage = function () {
    var questions = document.querySelectorAll('.questions__elem-js');
    var programsItem = document.querySelectorAll('.programs__item');

    questions.forEach(function (el) {
      el.style.display = 'none';
    });

    programsItem.forEach(function (el) {
      if (!el.classList.contains('active')) {
        el.style.display = 'none';
      }
    });
  }

  document.addEventListener("DOMContentLoaded", getReadyPage);

})();
