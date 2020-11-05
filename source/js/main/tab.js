'use strict';
(function () {
  var tabLinks = document.querySelectorAll('.programs__button');
  var tabContent = document.querySelectorAll('.programs__item');

  function openTabs(elem) {
    var btnTarget = elem.currentTarget;
    var program = btnTarget.dataset.program;

    tabContent.forEach(function (x) {
      x.classList.remove('active');
    });

    tabLinks.forEach(function (y) {
      y.classList.remove('programs__button--select');
    });

    document.querySelector('#' + program).classList.add('active');

    btnTarget.classList.add('programs__button--select');
  }

  tabLinks.forEach(function (el) {
    el.addEventListener('click', openTabs);
  });

})();
