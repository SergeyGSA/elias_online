import { Route } from '@angular/router';

export const appRoutes: Route[] = [
  {
    path: 'simple-register',
    loadComponent: () =>
      import('./pages/simple-register/simple-register.component').then(
        (m) => m.SimpleRegisterComponent
      ),
  },
  {
    path: 'main-page',
    loadComponent: () =>
      import('./pages/main-page/main-page.component').then(
        (m) => m.MainPageComponent
      ),
  },
];
