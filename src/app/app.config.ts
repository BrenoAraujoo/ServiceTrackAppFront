import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideAnimations } from '@angular/platform-browser/animations';

import { routes } from './app.routes';
import { HTTP_INTERCEPTORS, provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { MessageService } from 'primeng/api';
import { JWT_OPTIONS, JwtHelperService } from '@auth0/angular-jwt';
import { AuthInterceptor } from './core/auth/interceptors/auth-interceptor';

export const appConfig: ApplicationConfig = {
  providers:
   [provideZoneChangeDetection({ eventCoalescing: true }),
     provideRouter(routes),
      provideAnimations(),
      provideHttpClient(withInterceptorsFromDi()),
      MessageService,
      {provide: JWT_OPTIONS,useValue:JWT_OPTIONS},
      {provide: HTTP_INTERCEPTORS, useClass : AuthInterceptor, multi: true},
      JwtHelperService]
}; 
