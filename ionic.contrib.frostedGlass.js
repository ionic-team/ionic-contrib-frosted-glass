(function() {

'use strict';

/**
 * The ionic-contrib-frosted-glass is a fun frosted-glass effect
 * that can be used in iOS apps to give an iOS 7 frosted-glass effect
 */
angular.module('ionic.contrib.frostedGlass', ['ionic'])

.factory('$ionicFrostedDelegate', ['$rootScope', function($rootScope) {
  return {
    update: function() {
      $rootScope.$emit('ionicFrosted.update');
    }
  }
}])

.directive('frostedBar', ['$timeout', '$rootScope', '$ionicScrollDelegate', function($timeout, $rootScope, $ionicScrollDelegate) {
  var clone = function($element) {
    var el = $element[0];

    var content = $element.parent()[0].querySelector('.scroll');
    if(!content) {
      return;
    }

    var scrollStart = content.style[ionic.CSS.TRANSFORM];
    var startY = parseFloat(scrollStart.replace('translate3d(', '').split(',')[1]) || 0;

    // Get the top offset position for headers, etc. on this content area
    var contentOffset = content.parentNode.offsetTop;

    // Get the height of the header to know how much to offset the content blur
    var elHeight = el.offsetHeight;

    // Clone the content
    var contentCloned = content.cloneNode(true);

    // Append the cloned content into the blur box
    var blurContent = document.createElement('div');
    blurContent.className = 'ionic-contrib-blur';
    blurContent.style.overflow = 'hidden';
    blurContent.style.height = elHeight + 'px';
    blurContent.appendChild(contentCloned);

    content.parentNode.addEventListener('scroll', function(e) {
      // Move the clone up as we scroll
      contentCloned.style[ionic.CSS.TRANSFORM] = 'translate3d(0,' + (-e.detail.scrollTop + contentOffset) + 'px, 0)';
    });
    contentCloned.style[ionic.CSS.TRANSFORM] = 'translate3d(0,' + (startY + contentOffset) + 'px, 0)';

    // Append the blur box into this element
    $element.append(blurContent);
    return blurContent;
  };

  return {
    restrict: 'AC',
    link: function($scope, $element, $attr, frosted) {
      var blurContent = null;

      $rootScope.$on('ionicFrosted.update', function() {
        ionic.requestAnimationFrame(function() {
          if(blurContent) {
            blurContent.remove();
            blurContent = clone($element);
          }
        });
      });

      // timeout so we allow child directives to
      // render children
      $timeout(function() {
        ionic.requestAnimationFrame(function() {
          blurContent = clone($element);
        });
      });
    }
  }
}]);

})();
