import { bootstrapApplication } from '@angular/platform-browser';
import { provideHttpClient } from '@angular/common/http';
import { provideNoopAnimations } from '@angular/platform-browser/animations';
import { provideServiceWorker } from '@angular/service-worker';
import { isDevMode } from '@angular/core';
import { AppComponent } from './app/app.component';

bootstrapApplication(AppComponent, {
  providers: [
    provideNoopAnimations(),
    provideHttpClient(),
    provideServiceWorker('ngsw-worker.js', { enabled: !isDevMode() }),
  ]
}).catch(err => console.error(err));
