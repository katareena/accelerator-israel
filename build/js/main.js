'use strict';
(function () {
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

  window.maskPhone = {
    maskPhoneHandler: maskPhoneHandler
  };
})();

'use strict';
(function () {
  var ESCAPE = 'Escape';
  var link = document.querySelector('.header__callback');
  var popup = document.querySelector('.callback');
  var close = popup.querySelector('.callback__close');
  var form = popup.querySelector('.callback__form');
  var nameUser = popup.querySelector('[name=callback-name]');
  var phoneUser = popup.querySelector('[name=user-phone]');
  var checkbox = document.querySelector('input[type=checkbox]');

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

  var openHeandler = function (evt) {
    evt.preventDefault();
    form.reset();
    popup.classList.add('callback--open');
    nameUser.focus();

    form.addEventListener('submit', window.modalCallback.submitHeandler);
    close.addEventListener('click', window.modalCallback.closeFormHeandler);
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
    popup.removeEventListener('click', window.modalCallback.closeOverlayHandler);
    window.removeEventListener('keydown', window.modalCallback.closeEscHandler);
  };

  var closeFormHeandler = function (evt) {
    evt.preventDefault();
    popup.classList.remove('callback--open');
    popup.classList.remove('callback--error');
    popup.removeEventListener('click', window.modalCallback.closeOverlayHandler);
    window.removeEventListener('keydown', window.modalCallback.closeEscHandler);
  };

  var closeEscHandler = function (evt) {
    if (evt.key === ESCAPE) {
      if (popup.classList.contains('callback--open')) {
        evt.preventDefault();
        popup.classList.remove('callback--open');
        popup.classList.remove('callback--error');
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
    closeOverlayHandler: closeOverlayHandler
  };

  link.addEventListener('click', window.modalCallback.openHeandler);

})();

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
      y.classList.remove('select');
    });

    document.querySelector('#' + program).classList.add('active');

    btnTarget.classList.add('select');
  }

  tabLinks.forEach(function (el) {
    el.addEventListener('click', openTabs);
  });

})();
