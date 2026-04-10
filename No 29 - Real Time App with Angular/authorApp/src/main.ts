import { bootstrapApplication } from '@angular/platform-browser';
import { importProvidersFrom } from '@angular/core';
import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';
import { AppComponent } from './app/app.component';

const socketConfig: SocketIoConfig = { url: 'http://localhost:5004' };

bootstrapApplication(AppComponent, {
  providers: [
    importProvidersFrom(SocketIoModule.forRoot(socketConfig)),
  ]
}).catch(err => console.error(err));
