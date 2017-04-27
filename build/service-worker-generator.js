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
    "src/**/*.ico",
    "src/**/*.json"
];

self.writeServiceWorkerFile = function (rootDir, handleFetch) {
  var packageJson = JSON.parse(fs.readFileSync('./package.json'));

  var config = {
    cacheId: packageJson.name,
    handleFetch: handleFetch,
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
    staticFileGlobs: [
      rootDir + '/css/**.css',
      rootDir + '/**.html',
      rootDir + '/images/**.*',
      rootDir + '/js/**.js'
    ],
    stripPrefix: rootDir + '/',
    verbose: true
  };

  swPrecache.write(path.join(rootDir, 'service-worker.js'), config);    
}

self.watch = function() {
    console.log("ServiceWorker generator watching files");
    chokidar.watch(self.globsToWatch, {}).on('all', (event, path) => {
      self.build();
    });
}

self.build = function() {
    self.writeServiceWorkerFile("src", true);
}

module.exports = self;