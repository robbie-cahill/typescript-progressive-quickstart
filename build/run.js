var program = require('commander');
var serviceWorkerGenerator = require('./service-worker-generator.js');

program
  .version('0.0.1')
  .option('-w, --watch', 'Watch Files. Generate Service Worker on changes', serviceWorkerGenerator.watch)
  .option('-b, --build', 'Generate Service Worker', serviceWorkerGenerator.build)
  .parse(process.argv);
