'use strict';
(function () {
  var ESCAPE = 'Escape';
  var message = document.querySelector('.success');
  var buttonMessage = message.querySelector('.success__button');
  var closeMessage = message.querySelector('.success__close');

  var closeMessageHeandler = function (evt) {
    evt.preventDefault();
    message.classList.remove('success--open');
  };

  var closeMessageEscHandler = function (evt) {
    if (evt.key === ESCAPE) {
      if (message.classList.contains('success--open')) {
        evt.preventDefault();
        message.classList.remove('success--open');
      }
    }
  };

  var closeOverlayHandler = function (evt) {
    window.matchesForIE.changeMatchesForIE();
    if (!evt.target.matches('.success__inner, .success__inner *')) {
      if (message.classList.contains('success--open')) {
        evt.preventDefault();
        message.classList.remove('success--open');
      }
    }
  };

  //--------
  var intentionPhoneUser = document.querySelector('[name=user-phone]');

  var submitHeandler = function (evt) {
    evt.preventDefault();
    if (intentionPhoneUser.value) {
      message.classList.add('success--open');
    }
  };

  window.success = {
    closeMessageHeandler: closeMessageHeandler,
    closeMessageEscHandler: closeMessageEscHandler,
    closeOverlayHandler: closeOverlayHandler,
    submitHeandler: submitHeandler
  };

  window.addEventListener('keydown', window.success.closeMessageEscHandler);
  message.addEventListener('click', window.success.closeOverlayHandler);
  closeMessage.addEventListener('click', window.success.closeMessageHeandler);
  buttonMessage.addEventListener('click', window.success.closeMessageHeandler);

  var intentionForm = document.querySelector('.intention__form');
  intentionForm.addEventListener('submit', window.success.submitHeandler);
  intentionPhoneUser.addEventListener('keydown', window.maskPhone.maskPhoneHandler);

})();
