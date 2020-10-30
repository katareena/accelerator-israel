'use strict';
(function () {
  var tabLinks = document.querySelectorAll('#tab');
  var tabContent = document.querySelectorAll('.programs__item');

  function openTabs(elem) {
    var btnTarget = elem.currentTarget;
    var program = btnTarget.dataset.program;

    tabContent.forEach(function (x) {
      x.classList.remove('active');
    });

    tabLinks.forEach(function (y) {
      y.classList.remove('select');
    });

    document.querySelector('#' + program).classList.add('active');

    btnTarget.classList.add('select');
  }

  tabLinks.forEach(function (el) {
    el.addEventListener('click', openTabs);
  });

})();