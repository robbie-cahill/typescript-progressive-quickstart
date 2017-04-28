var chokidar = require('chokidar');
var fs = require('fs');
var swPrecache = require('sw-precache');
var path = require('path');

var self = {};

self.globsToWatch = [
    "src/**/*.js",
    "src/**/*.css",
    "src/**/*.html",
    "src/**/*.jpg",
    "src/**/*.png",
    "src/**/*.gif", 
    "src/**/*.ico"
];

self.serviceWorkerFile = 'src/service-worker.js';

self.writeServiceWorkerFile = function () {
  var packageJson = JSON.parse(fs.readFileSync('./package.json'));

  var config = {
    cacheId: packageJson.name,
    handleFetch: true,
    logger: console.log,
    runtimeCaching: [{
      urlPattern: /runtime-caching/,
      handler: 'cacheFirst',
      options: {
        cache: {
          maxEntries: 1,
          name: 'runtime-cache'
        }
      }
    }],
    staticFileGlobs: self.globsToWatch,
    stripPrefix: 'src/',
    verbose: true
  };

  swPrecache.write(self.serviceWorkerFile, config);    
}

self.watch = function() {
    console.log("ServiceWorker generator watching files");
    chokidar.watch(self.globsToWatch, {ignored: /service-worker\.js/}).on('all', (event, path) => {
      self.build();
    });
}

self.build = function() {
    self.writeServiceWorkerFile();
}

module.exports = self;