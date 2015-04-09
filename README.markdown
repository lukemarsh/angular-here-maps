# angular-here-maps

> AngularJS directives for Nokia Here Maps

For pull requests please see branching strategy below! 

Master (1.0.4): [![Build Status](https://travis-ci.org/lukemarsh/angular-here-maps.svg?branch=master)](https://travis-ci.org/lukemarsh/angular-here-maps)

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

Retrieve the Here Maps library files from bower:

```sh
bower install here-maps-api --save
```

Include the here-maps-api JS and CSS files

```html
<link rel="stylesheet" href="/path/to/bower_components/here-maps-api/modules/ui/mapsjs-ui.css" />
<script src="/path/to/bower_components/here-maps-api/modules/mapsjs-core.js"></script>
<script src="/path/to/bower_components/here-maps-api/modules/service/mapsjs-service.js"></script>
<script src="/path/to/bower_components/here-maps-api/modules/mapevents/mapsjs-mapevents.js"></script>
<script src="/path/to/bower_components/here-maps-api/modules/ui/mapsjs-ui.js"></script>
<script src="/path/to/bower_components/here-maps-api/modules/pano/mapsjs-pano.js"></script>
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
        pixelPerInch: 320 // Optional (Default: 72)
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

If you plan to hack on the directives or want to run the example, first thing to do is to install NPM dependencies:

```shell
npm install #note bower install is run on post install 
```

### Building
To build the library after you made changes, simply run grunt:

```shell
grunt
```

### Running the example
To run the example page, just run

```shell
grunt serve
```

and your browser will automatically open on `http://localhost:9000`.

### Documentation
The various directives are documented at [official site](http://angular-google-maps.org).

### Contributing

Filing issues: 
 Prior to submiting an issue:
- Search open/**closed** issues, src examples (./examples), gitter, and then google plus community! **Again please search!**
- issues w/ plnkrs get attention quicker

Pull requests more than welcome! If you're adding new features, it would be appreciated if you would provide some docs about the feature. 
This can be done either by adding a card to our [Waffle.io board](https://waffle.io/lukemarsh/angular-here-maps), forking the website 
branch and issuing a PR with the updated documentation page, or by opening an issue for us to add the documentation to the site.

### Branching Scheme

- master: points to the active targeted next release branch (1.0.4)
