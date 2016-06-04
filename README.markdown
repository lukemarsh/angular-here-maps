# Angular Here Maps

> AngularJS directives for Nokia Here Maps

For pull requests please see branching strategy below!

Master (1.2.6): [![Build Status](https://travis-ci.org/lukemarsh/angular-here-maps.svg?branch=master)](https://travis-ci.org/lukemarsh/angular-here-maps)

task board: [![Stories in Ready](https://badge.waffle.io/lukeamarsh/angular-here-maps.png?label=ready&title=Ready)](https://waffle.io/lukemarsh/angular-here-maps)

[![Gitter chat](https://badges.gitter.im/lukemarsh/angular-here-maps.svg)](https://gitter.im/lukemarsh/angular-here-maps)

<img src="http://benschwarz.github.io/bower-badges/badge@2x.png?pkgname=angular-here-maps" width="130" height="30">&nbsp;

## Getting started
This is a set of directives and services for AngularJS `~1.0.7+, ^1.2.2+`.

## Installation
Add Angular:

```html
<script src="/path/to/bower_components/angular/angular.min.js" type="text/javascript"></script>
```

Include the here-maps-api JS and CSS files

```html
<link rel="stylesheet" href="http://js.api.here.com/v3/3.0/mapsjs-ui.css" />

<script src="http://js.api.here.com/v3/3.0/mapsjs-core.js" type="text/javascript" charset="utf-8"></script>
<script src="http://js.api.here.com/v3/3.0/mapsjs-service.js" type="text/javascript" charset="utf-8"></script>
<script src="http://js.api.here.com/v3/3.0/mapsjs-ui.js" type="text/javascript" charset="utf-8"></script>
<script src="http://js.api.here.com/v3/3.0/mapsjs-mapevents.js" type="text/javascript" charset="utf-8"></script>
<script src="http://js.api.here.com/v3/3.0/mapsjs-pano.js" type="text/javascript" charset="utf-8"></script>
```


Retrieve the module from bower:

```sh
bower install angular-here-maps --save
```

Include the angular-here-maps JS (after the angular.js JS and all the Here Maps JS library files):

```html
<script src="/path/to/bower_components/angular-here-maps/build/angular-here-maps.min.js" type="text/javascript"></script>
```

Make your application depend on it:
```js
var app = angular.module('myApp', ['angular-here-maps']);
```

Add some configuration settings:
```js
.config(function(MapConfigProvider) {
    MapConfigProvider.setOptions({
        appId: 'your Here Maps app id',
        appCode: 'your Here Maps app code',
        libraries: 'ui,mapevents,pano',
        pixelRatio: 2, // Optional (Default: 1)
        pixelPerInch: 320, // Optional (Default: 72)
        useHTTPS: true,
        zoomMax: 16,
        zoomMin: 13
    });
})
```

include the map directive in your html:
```html
<map zoom="map.zoom" center="map.center"></map>
```

default center and zoom for the maps:
```js
$scope.map = {
  zoom : 14,
  center : {
    lng: -0.135559,
    lat: 51.513872
  }
};
```

You can choose the map type: default `normal` and `satellite`:

```html
<map zoom="map.zoom" center="map.center" type="map.type"></map>
```

```js
$scope.map = {
  zoom : 14,
  center : {
    lng: -0.135559,
    lat: 51.513872
  },
  type: 'satellite'
};
```

### Map Events

#### onLoad Map

```html
<map center="map.center" on-load="mapOnLoad"></map>
```

```js
$scope.mapOnLoad = function(platform, map){
  var center = map.getCenter();
};
```

#### onTap Map

```html
<map center="map.center" on-tap="mapEventOnTap"></map>
```

```js
$scope.mapEventOnTap = function(event, platform, map){
  // center map on tap
  var coord = map.screenToGeo(event.currentPointer.viewportX, event.currentPointer.viewportY);
  $scope.$apply(function(){
    $scope.map.center = coord;
  });
};
```

#### onDoubleTap Map

```html
<map center="map.center" on-double-tap="mapEventOnDoubleTap"></map>
```

```js
$scope.mapEventOnDoubleTap = function(event, platform, map){
  // center map on double tap
  var coord = map.screenToGeo(event.currentPointer.viewportX, event.currentPointer.viewportY);
  $scope.$apply(function(){
    $scope.map.center = coord;
  });
};
```

#### onDragStart Map

```html
<map center="map.center" on-drag-start="mapEventOnDragStart"></map>
```

```js
$scope.mapEventOnDragStart = function(event, platform, map){

};
```

#### onDrag Map

```html
<map center="map.center" on-drag="mapEventOnDrag"></map>
```

```js
$scope.mapEventOnDrag = function(event, platform, map){

};
```

#### onDragEnd Map

```html
<map center="map.center" on-drag-end="mapEventOnDragEnd"></map>
```

```js
$scope.mapEventOnDragEnd = function(event, platform, map){

};
```

If you plan to hack on the directives or want to run the example, first thing to do is to install NPM dependencies:

```shell
npm install #note bower install is run on post install
```

### Building
To build the library after you made changes, simply run grunt:

```shell
grunt
```

### Running in Development mode
To run the directives in development mode, just run

```shell
grunt serve
```

and your browser will automatically open on `http://localhost:9002`.

### Running the example
To run the example page, just run

```shell
grunt serve:examples
```

and your browser will automatically open on `http://localhost:9000`.

### Documentation
The various directives are documented at [official site](http://lukemarsh.github.io/angular-here-maps/).

### Contributing

Filing issues:
 Prior to submiting an issue:
- Search open/**closed** issues, src examples (./examples), and gitter! **Again please search!**
- issues w/ plnkrs get attention quicker

Pull requests more than welcome! If you're adding new features, it would be appreciated if you would provide some docs about the feature.
This can be done either by adding a card to our [Waffle.io board](https://waffle.io/lukemarsh/angular-here-maps), forking the website
branch and issuing a PR with the updated documentation page, or by opening an issue for us to add the documentation to the site.

### Branching Scheme

- master: points to the active targeted next release branch (1.2.6)
