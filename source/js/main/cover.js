'use strict';
(function () {
  var cover = document.querySelector('.cover');

  var closeOverlayHandler = function (evt) {
    window.matchesForIE.changeMatchesForIE();
      if (cover.classList.contains('cover--show')) {
        evt.preventDefault();
        cover.classList.remove('cover--show');
    }
  };

  document.addEventListener('click', closeOverlayHandler);

})();
