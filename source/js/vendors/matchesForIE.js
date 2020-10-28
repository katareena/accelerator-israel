'use strict';

(function () {

  var changeMatchesForIE = function () {
    if (!Element.prototype.matches) {
      Element.prototype.matches = Element.prototype.matchesSelector ||
        Element.prototype.webkitMatchesSelector ||
        Element.prototype.mozMatchesSelector ||
        Element.prototype.msMatchesSelector;
    }
  };

  window.matchesForIE = {
    changeMatchesForIE: changeMatchesForIE
  };

})();
