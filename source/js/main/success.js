'use strict';
(function () {
  var ESCAPE = 'Escape';
  var message = document.querySelector('.success');
  var buttonMessage = message.querySelector('.success__button');
  var closeMessage = message.querySelector('.success__close');
  var inputsPhoneUser = document.querySelectorAll('.user-phone-js');
  var forms = document.querySelectorAll('.forms-js');

  // --- хендлеры на все виды закрытия окна Успешной отправки ---
  var closeMessageHandler = function (evt) {
    evt.preventDefault();
    message.classList.remove('success--open');
    forms.forEach(function (el) {
      el.reset();
    });
    window.modalCallback.getScroll();
  };

  var closeMessageEscHandler = function (evt) {
    if (evt.key === ESCAPE) {
      if (message.classList.contains('success--open')) {
        evt.preventDefault();
        message.classList.remove('success--open');
        forms.forEach(function (el) {
          el.reset();
        });
        window.modalCallback.getScroll();
      }
    }
  };

  var closeOverlayHandler = function (evt) {
    window.matchesForIE.changeMatchesForIE();
    if (!evt.target.matches('.success__inner, .success__inner *')) {
      if (message.classList.contains('success--open')) {
        evt.preventDefault();
        message.classList.remove('success--open');
        forms.forEach(function (el) {
          el.reset();
        });
        window.modalCallback.getScroll();
      }
    }
  };

  // --- хендлер на submit всех форм ---
  var submitHandler = function (evt) {
    evt.preventDefault();
    for (var i = 0; i < inputsPhoneUser.length; i++) {
      if (inputsPhoneUser[i].value) {
        message.classList.add('success--open');
        window.modalCallback.preventScroll();
      }
    }
  };

  window.success = {
    closeMessageHandler: closeMessageHandler,
    closeMessageEscHandler: closeMessageEscHandler,
    closeOverlayHandler: closeOverlayHandler,
    submitHandler: submitHandler
  };

  // --- обработчк на все формы для открытия окна Успешной отправки ---
  forms.forEach(function (el) {
    el.addEventListener('submit', window.success.submitHandler);
  });
  // --- обработчики на все виды закрытия окна Успешной отправки ---
  window.addEventListener('keydown', window.success.closeMessageEscHandler);
  message.addEventListener('click', window.success.closeOverlayHandler);
  closeMessage.addEventListener('click', window.success.closeMessageHandler);
  buttonMessage.addEventListener('click', window.success.closeMessageHandler);

})();
