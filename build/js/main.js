'use strict';
(function () {
  var arrows = document.querySelectorAll('.questions__arrow');


  var moveAccordion = function (elem) {

    var btnTarget = elem.currentTarget;
    var questions = btnTarget.dataset.questions;
    if (btnTarget.classList.contains('open')) {
      document.querySelector('#' + questions).style.display = 'none';
      btnTarget.classList.remove('open');
    } else {
      document.querySelector('#' + questions).style.display = 'block';
      btnTarget.classList.toggle('open');
    }
  }

  arrows.forEach(function (el) {
    el.addEventListener('click', moveAccordion);
  });

})();

'use strict';
(function () {
  var getReadyPage = function () {
    var questions = document.querySelectorAll('.questions__elem-js');
    var programsItem = document.querySelectorAll('.programs__item');

    questions.forEach(function (el) {
      el.style.display = 'none';
    });

    programsItem.forEach(function (el) {
      if (!el.classList.contains('active')) {
        el.style.display = 'none';
      }
    });
  }

  document.addEventListener("DOMContentLoaded", getReadyPage);

})();

'use strict';
(function () {
  function mapInit() {
    var screens = {
      sm: 320,
      md: 768,
      xl: 1024
    };
    var iconSize = {
      sm: [20, 30],
      md: [20, 30],
      xl: [20, 30]
    };
    var iconOffset = {
      sm: [-10, -30],
      md: [-10, -30],
      xl: [-10, -30]
    };
    var mapCenter = {
      sm: [55.028594, 82.928222],
      md: [55.028594, 82.928222],
      xl: [55.028594, 82.928222]
    };
    var mapZoom = {
      sm: 17,
      md: 17,
      xl: 17
    };

    function getScreenSize() {
      var documentWidth = document.documentElement.clientWidth;

      if (documentWidth < screens.md) {
        return 'sm';
      }

      if (documentWidth < screens.xl) {
        return 'md';
      }

      return 'xl';
    }

    var screenSize = getScreenSize();
    var map = new ymaps.Map(document.querySelector('.details__map'), {
      center: mapCenter[screenSize],
      zoom: mapZoom[screenSize],
      controls: ['zoomControl']
    });
    map.container.fitToViewport();
    map.behaviors.disable('scrollZoom');

    function createMarker(screenWidth) {
      return new ymaps.Placemark([55.028594, 82.928222], {}, {
        iconLayout: 'default#image',
        iconImageHref: 'img/map-pin.svg',
        iconImageSize: iconSize[screenWidth],
        iconImageOffset: iconOffset[screenWidth]
      });
    }

    var marker = createMarker(screenSize);
    map.geoObjects.add(marker);
    map.events.add('sizechange', function (event) {
      var oldWidth = event.get('oldSize')[0];
      var newWidth = event.get('newSize')[0];

      function updateMarker() {
        map.geoObjects.remove(marker);
        marker = createMarker(getScreenSize());
        map.geoObjects.add(marker);
      }

      if (oldWidth < screens.md && newWidth >= screens.md) {
        updateMarker();
      }

      if (oldWidth >= screens.md && newWidth < screens.md) {
        updateMarker();
      }

      if (oldWidth < screens.xl && newWidth >= screens.xl) {
        map.setCenter(mapCenter.xl, mapZoom.xl);
      }

      if (oldWidth >= screens.xl && newWidth < screens.xl) {
        map.setCenter(mapCenter.md, mapZoom.md);
      }
    });
  }

  window.map = {
    mapInit: mapInit
  };

  ymaps.ready(window.map.mapInit);
})();

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

  // --- обработчк на все инпуты для применения формата ввода ---
  var inputsPhoneUser = document.querySelectorAll('.user-phone-js');
  inputsPhoneUser.forEach(function (el) {
    el.addEventListener('keydown', window.maskPhone.maskPhoneHandler);
  });

})();

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

  var openHandler = function (evt) {
    evt.preventDefault();
    form.reset();
    popup.classList.add('callback--open');
    nameUser.focus();
    preventScroll();
    form.addEventListener('submit', window.modalCallback.submitHandler);
    closeBtn.addEventListener('click', window.modalCallback.closeFormHandler);
    phoneUser.addEventListener('keydown', window.maskPhone.maskPhoneHandler);
    popup.addEventListener('click', window.modalCallback.closeOverlayHandler);
    window.addEventListener('keydown', window.modalCallback.closeEscHandler);
  };

  var submitHandler = function (evt) {
    evt.preventDefault();
    if (!nameUser.value || !phoneUser.value || !checkbox.checked) {
      popup.classList.remove('callback--error');
      popup.classList.add('callback--error');
    } else {
      if (isStorageSupport) {
        localStorage.setItem('nameUser', nameUser.value);
        localStorage.setItem('phoneUser', phoneUser.value);
      }
      message.classList.add('success--open');
      window.modalCallback.closeForm();
      window.addEventListener('keydown', window.success.closeMessageEscHandler);
      message.addEventListener('click', window.success.closeOverlayHandler);
      closeMessage.addEventListener('click', window.success.closeMessageHandler);
      buttonMessage.addEventListener('click', window.success.closeMessageHandler);
    }
  };

  var closeForm = function () {
    popup.classList.remove('callback--open');
    popup.classList.remove('callback--error');
    getScroll();
    popup.removeEventListener('click', window.modalCallback.closeOverlayHandler);
    window.removeEventListener('keydown', window.modalCallback.closeEscHandler);
  };

  var closeFormHandler = function (evt) {
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
    openHandler: openHandler,
    submitHandler: submitHandler,
    closeFormHandler: closeFormHandler,
    closeForm: closeForm,
    closeEscHandler: closeEscHandler,
    closeOverlayHandler: closeOverlayHandler,
    preventScroll: preventScroll,
    getScroll: getScroll
  };

  link.addEventListener('click', window.modalCallback.openHandler);

})();

'use strict';
(function () {
  var slideIndex = 1;

  showSlidesFeedback(slideIndex);

  function nextSlide() {
    showSlidesFeedback(slideIndex += 1);
  }

  function prevSlide() {
    showSlidesFeedback(slideIndex -= 1);
  }

  function showSlidesFeedback(n) {
      var i;
      var slides = document.getElementsByClassName('feedback__slide');
      var numberValue = document.querySelector('.feedback__number');
      var totalValue = document.querySelector('.feedback__total');

      if (n > slides.length) {
        slideIndex = 1
        numberValue.textContent = 1;
        totalValue.textContent = slides.length;
      }
      if (n < 1) {
          slideIndex = slides.length
      }
      for (i = 0; i < slides.length; i++) {
          slides[i].style.display = 'none';
      }

      slides[slideIndex - 1].style.display = 'block';
      numberValue.textContent = slideIndex;
      totalValue.textContent = slides.length;
  }

  var prevBtnFdb = document.querySelector('.feedback__arrow-prev');
  var nextBtnFdb = document.querySelector('.feedback__arrow-next');

  prevBtnFdb.addEventListener('click', prevSlide);
  nextBtnFdb.addEventListener('click', nextSlide);
})();

'use strict';
(function () {
  var MAX_TABLET_WIDTH = 1023;
  var slideIndex = 1;

  showSlidesPastime(slideIndex);

  function plusSlide() {
    showSlidesPastime(slideIndex += 1);
  }

  function minusSlide() {
    showSlidesPastime(slideIndex -= 1);
  }

  function showSlidesPastime(n) {
    if(window.innerWidth <= MAX_TABLET_WIDTH) {
      var i;
      var slides = document.getElementsByClassName('pastime__item');
      var dots = document.getElementsByClassName('pastime__dot');
      if (n > slides.length) {
        slideIndex = 1
      }
      if (n < 1) {
        slideIndex = slides.length
      }
      for (i = 0; i < slides.length; i++) {
        slides[i].style.display = 'none';
      }
      for (i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(' pastime__dot--activ', '');
      }
      slides[slideIndex - 1].style.display = 'flex';
      dots[slideIndex - 1].className += ' pastime__dot--activ';
    }
  }

  var prevBtn = document.querySelector('.pastime__prev');
  var nextBtn = document.querySelector('.pastime__next');

  prevBtn.addEventListener('click', minusSlide);
  nextBtn.addEventListener('click', plusSlide);

})();

// 'use strict';
// (function () {
//   var MAX_MOBILE_WIDTH = 767;
//   var slideIndex = 1;

//   showSlidesBtn(slideIndex);

//   function pplusSlide() {
//     showSlidesBtn(slideIndex += 1);
//   }

//   function mminusSlide() {
//     showSlidesBtn(slideIndex -= 1);
//   }

//   function showSlidesBtn(n) {
//     if(window.innerWidth <= MAX_MOBILE_WIDTH) {
      // var i;
      // var btns = document.querySelectorAll('.programs__button');
      // var slides = document.getElementsByClassName('programs__item');

      // if (n > btns.length) {
      //   slideIndex = 1
      // }
      // if (n < 1) {
      //   slideIndex = btns.length
      // }
      // console.log(slideIndex);
      // btns.forEach(function (y) {
      //   var programClass = y.dataset.program;
      //   y.classList.remove('programs__button--select-' + programClass);
      // });


  //     for (i = 0; i < slides.length; i++) {
  //       slides[i].className = slides[i].className.replace(' pastime__dot--activ', '');
  //     }
  //     btns[slideIndex - 1].style.display = 'flex';
  //     slides[slideIndex - 1].className += ' pastime__dot--activ';
//     }
//   }

//   var pprevBtn = document.querySelector('.programs__control-prev');
//   var nnextBtn = document.querySelector('.programs__control-next');

//   pprevBtn.addEventListener('click', mminusSlide);
//   nnextBtn.addEventListener('click', pplusSlide);

// })();

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

'use strict';
(function () {
  var tabsLink = document.querySelectorAll('.programs__button');
  var tabsContent = document.querySelectorAll('.programs__item');

  function openTabs(elem) {
    var btnTarget = elem.currentTarget;
    var program = btnTarget.dataset.program;

    tabsContent.forEach(function (x) {
      x.style.display = 'none';
    });

    tabsLink.forEach(function (y) {
      var programClass = y.dataset.program;
      y.classList.remove('programs__button--select-' + programClass);
    });

    document.querySelector('#' + program).style.display = 'block'
    btnTarget.classList.add('programs__button--select-' + program);
  }

  tabsLink.forEach(function (el) {
    el.addEventListener('click', openTabs);
  });

})();
