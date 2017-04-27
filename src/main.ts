import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';

//Register Service Worker
if ('serviceWorker' in navigator) {
    navigator.serviceWorker
            .register('./service-worker.js')
            .then(function() { console.log('Service Worker Registered'); });
}

platformBrowserDynamic().bootstrapModule(AppModule);
