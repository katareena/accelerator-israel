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
