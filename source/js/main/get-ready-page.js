'use strict';
(function () {
  var MIN_WIDTH = 767;
  var MAX_WIDTH = 1023;

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

    if(window.innerWidth <= MAX_WIDTH) {
      var gallery = document.querySelector('.pastime__inner');
      gallery.classList.add('pastime__inner--slider');
    }
    });
  }

  var matchHeight = function () {
    if(window.innerWidth >= MIN_WIDTH) {
      var maxColHeight = 0; // максимальная высота, первоначально 0
      var columns = document.getElementsByClassName('feedback__slide'); // получаем массив колонок (всех элементов класса column)

      for (var i = columns.length - 1; i >= 0; i--) {
        columns[i].style.display = 'block'; // показать все элементы, чтобы считать их высоту

        if(columns[i].offsetHeight > maxColHeight) {
          maxColHeight = columns[i].offsetHeight; // устанавливаем новое значение максимальной высоты
        }
      }

      for (var i = columns.length - 1; i >= 0; i--) {
        columns[i].style.height = maxColHeight + 'px'; // устанавливаем высоту каждой колонки равной максимальной
      }

      for (i = 1; i < columns.length; i++) {
        columns[i].style.display = 'none';
      }
    }
  }

  document.addEventListener('DOMContentLoaded', getReadyPage);
  document.addEventListener('DOMContentLoaded', matchHeight);

})();
