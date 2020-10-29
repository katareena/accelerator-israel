'use strict';
(function () {
  var ESCAPE = 'Escape';
  var massege = document.querySelector('.success');
  var buttonMassege = massege.querySelector('.success__button');
  var closeMassege = massege.querySelector('.success__close');

  var closeMassegeHeandler = function (evt) {
    evt.preventDefault();
    massege.classList.remove('success--open');
    window.removeEventListener('keydown', window.success.closeMassegeEscHandler);
    massege.removeEventListener('click', window.success.closeOverlayHandler);
    closeMassege.removeEventListener('click', window.success.closeMassegeHeandler);
    buttonMassege.removeEventListener('click', window.success.closeMassegeHeandler);
  };

  var closeMassegeEscHandler = function (evt) {
    if (evt.key === ESCAPE) {
      if (massege.classList.contains('success--open')) {
        evt.preventDefault();
        massege.classList.remove('success--open');
        window.removeEventListener('keydown', window.success.closeMassegeEscHandler);
        massege.removeEventListener('click', window.success.closeOverlayHandler);
        closeMassege.removeEventListener('click', window.success.closeMassegeHeandler);
        buttonMassege.removeEventListener('click', window.success.closeMassegeHeandler);
      }
    }
  };

  var closeOverlayHandler = function (evt) {
    window.matchesForIE.changeMatchesForIE();
    if (!evt.target.matches('.success__inner, .success__inner *')) {
      if (massege.classList.contains('success--open')) {
        evt.preventDefault();
        massege.classList.remove('success--open');
        window.removeEventListener('keydown', window.success.closeMassegeEscHandler);
        massege.removeEventListener('click', window.success.closeOverlayHandler);
        closeMassege.removeEventListener('click', window.success.closeMassegeHeandler);
        buttonMassege.removeEventListener('click', window.success.closeMassegeHeandler);
      }
    }
  };

  window.success = {
    closeMassegeHeandler: closeMassegeHeandler,
    closeMassegeEscHandler: closeMassegeEscHandler,
    closeOverlayHandler: closeOverlayHandler
  };
})();
