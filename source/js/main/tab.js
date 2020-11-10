'use strict';
(function () {
  var tabsLink = document.querySelectorAll('.programs__button');
  var tabsContent = document.querySelectorAll('.programs__item');

  function openTabs(elem) {
    var btnTarget = elem.currentTarget;
    var program = btnTarget.dataset.program;

    tabsContent.forEach(function (x) {
      // x.classList.remove('active');
      x.style.display = 'none';
    });

    tabsLink.forEach(function (y) {
      var programClass = y.dataset.program;
      y.classList.remove('programs__button--select-' + programClass);
    });

    // document.querySelector('#' + program).classList.add('active');
    document.querySelector('#' + program).style.display = 'block'
    btnTarget.classList.add('programs__button--select-' + program);
  }

  tabsLink.forEach(function (el) {
    el.addEventListener('click', openTabs);
  });

})();
