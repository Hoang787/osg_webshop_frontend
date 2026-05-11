import {ApplicationConfig, isDevMode, LOCALE_ID, provideZoneChangeDetection} from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import {provideAnimationsAsync} from '@angular/platform-browser/animations/async';
import {HttpClient, provideHttpClient} from '@angular/common/http';
import {provideAnimations} from '@angular/platform-browser/animations';
import {providePrimeNG} from 'primeng/config';
import Material from '@primeng/themes/material';
import {provideTranslateHttpLoader} from '@ngx-translate/http-loader';
import {provideTranslateService, provideTranslateLoader, provideChildTranslateService} from "@ngx-translate/core";
import {DecimalPipe} from '@angular/common';
import {PinchZoomModule} from 'ngx-pinch-zoom';


export const appConfig: ApplicationConfig = {

  providers: [provideZoneChangeDetection({eventCoalescing: true}), provideChildTranslateService()  , provideRouter(routes), DecimalPipe, provideAnimationsAsync(), provideHttpClient(), provideAnimations(),
    provideTranslateService({
      loader: provideTranslateHttpLoader({prefix:'./assets/i18n/', suffix:'.json'}),
      fallbackLang: 'gb'
    }),
    providePrimeNG({
    theme: {
      preset: Material,
      options: {
        prefix: 'p',
        darkModeSelector: '.dark-theme'
      }
    },
    ripple: true
  })
  ]
};
