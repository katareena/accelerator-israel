'use strict';
(function () {
  var ESCAPE = 'Escape';
  var link = document.querySelector('.header__callback');
  var popup = document.querySelector('.callback');
  var closeBtn = popup.querySelector('.callback__close');
  var form = popup.querySelector('.callback__form');
  var nameUser = popup.querySelector('.user-name-js');
  var phoneUser = popup.querySelector('.user-phone-js');
  var checkbox = popup.querySelector('input[type=checkbox]');

  var message = document.querySelector('.success');
  var buttonMessage = message.querySelector('.success__button');
  var closeMessage = message.querySelector('.success__close');

  var isStorageSupport = true;
  var storage = '';

  try {
    storage = localStorage.getItem('nameUser');
  } catch (err) {
    isStorageSupport = false;
  }

  var preventScroll = function () {
    var body = document.body;
    body.style.height = '100vh';
    body.style.overflowY = 'hidden';
  }

  var getScroll = function () {
    const body = document.body;
    body.style.position = '';
    body.style.top = '';
    body.style.height = '';
    body.style.overflowY = '';
    window.scrollTo(0, parseInt(scrollY || '0') * -1);
  }

  var openHeandler = function (evt) {
    evt.preventDefault();
    form.reset();
    popup.classList.add('callback--open');
    nameUser.focus();
    preventScroll();
    form.addEventListener('submit', window.modalCallback.submitHeandler);
    closeBtn.addEventListener('click', window.modalCallback.closeFormHeandler);
    phoneUser.addEventListener('keydown', window.maskPhone.maskPhoneHandler);
    popup.addEventListener('click', window.modalCallback.closeOverlayHandler);
    window.addEventListener('keydown', window.modalCallback.closeEscHandler);
  };

  var submitHeandler = function (evt) {
    evt.preventDefault();
    if (!nameUser.value || !phoneUser.value || !checkbox.checked) {
      popup.classList.remove('callback--error');
      popup.classList.add('callback--error');
    } else {
      if (isStorageSupport) {
        localStorage.setItem('nameUser', name.value);
        localStorage.setItem('phoneUser', name.value);
      }
      message.classList.add('success--open');
      window.modalCallback.closeForm();
      window.addEventListener('keydown', window.success.closeMessageEscHandler);
      message.addEventListener('click', window.success.closeOverlayHandler);
      closeMessage.addEventListener('click', window.success.closeMessageHeandler);
      buttonMessage.addEventListener('click', window.success.closeMessageHeandler);
    }
  };

  var closeForm = function () {
    popup.classList.remove('callback--open');
    popup.classList.remove('callback--error');
    getScroll();
    popup.removeEventListener('click', window.modalCallback.closeOverlayHandler);
    window.removeEventListener('keydown', window.modalCallback.closeEscHandler);
  };

  var closeFormHeandler = function (evt) {
    evt.preventDefault();
    popup.classList.remove('callback--open');
    popup.classList.remove('callback--error');
    getScroll();
    popup.removeEventListener('click', window.modalCallback.closeOverlayHandler);
    window.removeEventListener('keydown', window.modalCallback.closeEscHandler);
  };

  var closeEscHandler = function (evt) {
    if (evt.key === ESCAPE) {
      if (popup.classList.contains('callback--open')) {
        evt.preventDefault();
        popup.classList.remove('callback--open');
        popup.classList.remove('callback--error');
        getScroll();
        popup.removeEventListener('click', window.modalCallback.closeOverlayHandler);
        window.removeEventListener('keydown', window.modalCallback.closeEscHandler);
      }
    }
  };

  var closeOverlayHandler = function (evt) {
    window.matchesForIE.changeMatchesForIE();
    if (!evt.target.matches('.callback__form, .callback__form *')) {
      if (popup.classList.contains('callback--open')) {
        evt.preventDefault();
        popup.classList.remove('callback--open');
        popup.classList.remove('callback--error');
        getScroll();
        popup.removeEventListener('click', window.modalCallback.closeOverlayHandler);
        window.removeEventListener('keydown', window.modalCallback.closeEscHandler);
      }
    }
  };

  window.modalCallback = {
    openHeandler: openHeandler,
    submitHeandler: submitHeandler,
    closeFormHeandler: closeFormHeandler,
    closeForm: closeForm,
    closeEscHandler: closeEscHandler,
    closeOverlayHandler: closeOverlayHandler,
    preventScroll: preventScroll,
    getScroll: getScroll
  };

  link.addEventListener('click', window.modalCallback.openHeandler);

})();
