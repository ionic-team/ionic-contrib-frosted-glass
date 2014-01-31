Ionic Frosted Glass
===========================

An optional frosted-glass effect for iOS 7 styled Ionic apps.

[Demo here](http://ionicframework.com/demos/frosted-glass/)

To use, include `ionic.contrib.frostedGlass.css` and `ionic.contrib.frostedGlass.js` in your app.

Then, apply the `frosted-bar` attribute directive to a `<header-bar>` or `<nav-bar>` to get the frosted effect. Note: you must also
have a `<content>` directive on the page which is where the content will be taken from for the blur. Also, feel free to use
the extra class `bar-frosted` for header bars that comes with the CSS, which gives you a light grey header bar much like
iMessage:

```html
<body>
  <pane ng-controller="PageCtrl">
    <header-bar frosted-bar title="'Title'" type="bar-frosted"></header-bar>

    <content has-header="true" has-footer="true" padding="true">
      <ol class="messages">
        <li ng-repeat="message in messages" ng-bind-html="message.content">
        </li>
      </ol>
    </content>
  </pane>
</body>
```

Unfortunately, it's not feasible to auto blur the content if it changes. To notify the frosted glass system to redraw itself, you can use the `$ionicFrostedDelegate` service:

```javascript
controller('MyCtrl', function($scope, $ionicFrostedDelegate, $ionicScrollDelegate) {
  $scope.addNew = function() {
    // Add new data
    
    // Resize the scroll area
    $ionicScrollDelegate.resize();

    // Update the frosted glass system
    $ionicFrostedDelegate.update();

    // If you wish, scroll to the bottom of the scroll box to show the new content
    $timeout(function() {
      $ionicScrollDelegate.scrollBottom(true);
    }, 1);
  }
});
```
