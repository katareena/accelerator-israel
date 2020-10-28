'use strict';
(function () {
  var ESCAPE = 'Escape';
  var link = document.querySelector('.header__callback');
  var popup = document.querySelector('.callback');
  var close = popup.querySelector('.callback__close');
  var form = popup.querySelector('.callback__form');
  var nameUser = popup.querySelector('[name=callback-name]');
  var phoneUser = popup.querySelector('[name=callback-phone]');
  var checkbox = document.querySelector('input[type=checkbox]');
  var isStorageSupport = true;
  var storage = '';

  try {
    storage = localStorage.getItem('nameUser');
  } catch (err) {
    isStorageSupport = false;
  }

  var openHeandler = function (evt) {
    evt.preventDefault();
    form.reset();
    popup.classList.add('callback-open');
    nameUser.focus();

    form.addEventListener('submit', window.modalCallback.submitHeandler);
    close.addEventListener('click', window.modalCallback.closeHeandler);
    phoneUser.addEventListener('keydown', window.modalCallback.maskPhoneHandler);
    popup.addEventListener('click', window.modalCallback.closeOverlayHandler);
    window.addEventListener('keydown', window.modalCallback.closeEscHandler);
  };

  var submitHeandler = function (evt) {
    if (!nameUser.value || !phoneUser.value || !checkbox.checked) {
      evt.preventDefault();
      popup.classList.remove('callback-error');
      // popup.offsetWidth = popup.offsetWidth;
      popup.classList.add('callback-error');
    } else {
      if (isStorageSupport) {
        localStorage.setItem('nameUser', name.value);
        localStorage.setItem('phoneUser', name.value);
      }
    }
  };

  var closeHeandler = function (evt) {
    evt.preventDefault();
    popup.classList.remove('callback-open');
    popup.classList.remove('callback-error');
    popup.removeEventListener('click', window.modalCallback.closeOverlayHandler);
    window.removeEventListener('keydown', window.modalCallback.closeEscHandler);
  };

  var closeEscHandler = function (evt) {
    if (evt.key === ESCAPE) {
      if (popup.classList.contains('callback-open')) {
        evt.preventDefault();
        popup.classList.remove('callback-open');
        popup.classList.remove('callback-error');
        popup.removeEventListener('click', window.modalCallback.closeOverlayHandler);
        window.removeEventListener('keydown', window.modalCallback.closeEscHandler);
      }
    }
  };

  var closeOverlayHandler = function (evt) {
    window.matchesForIE.changeMatchesForIE();
    if (!evt.target.matches('.callback__form, .callback__form *')) {
      if (popup.classList.contains('callback-open')) {
        evt.preventDefault();
        popup.classList.remove('callback-open');
        popup.classList.remove('callback-error');
        popup.removeEventListener('click', window.modalCallback.closeOverlayHandler);
        window.removeEventListener('keydown', window.modalCallback.closeEscHandler);
      }
    }
  };

  var maskPhoneHandler = function (evt) {
    if (!(evt.key === 'ArrowLeft' || evt.key === 'ArrowRight' || evt.key === 'Backspace' || evt.key === 'Tab')) {
      evt.preventDefault();
    }
    var mask = '+7 (111) 111-11-11';
    if (/[0-9\+\ \-\(\)]/.test(evt.key)) {
      var currentString = this.value;
      var currentLength = currentString.length;
      if (/[0-9]/.test(evt.key)) {
        if (mask[currentLength] === '1') {
          this.value = currentString + evt.key;
        } else {
          for (var i = currentLength; i < mask.length; i++) {
            if (mask[i] === '1') {
              this.value = currentString + evt.key;
              break;
            }
            currentString += mask[i];
          }
        }
      }
    }
  };

  window.modalCallback = {
    openHeandler: openHeandler,
    maskPhoneHandler: maskPhoneHandler,
    submitHeandler: submitHeandler,
    closeHeandler: closeHeandler,
    closeEscHandler: closeEscHandler,
    closeOverlayHandler: closeOverlayHandler
  };

  link.addEventListener('click', window.modalCallback.openHeandler);

})();
