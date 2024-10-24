import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideAnimations } from '@angular/platform-browser/animations';

import { routes } from './app.routes';
import { provideHttpClient } from '@angular/common/http';
import { MessageService } from 'primeng/api';
import { JWT_OPTIONS, JwtHelperService } from '@auth0/angular-jwt';

export const appConfig: ApplicationConfig = {
  providers:
   [provideZoneChangeDetection({ eventCoalescing: true }),
     provideRouter(routes),
      provideAnimations(),
      provideHttpClient(),
      MessageService,
      {provide: JWT_OPTIONS,useValue:JWT_OPTIONS},
      JwtHelperService]
}; 
