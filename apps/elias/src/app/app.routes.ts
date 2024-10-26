import { Route } from '@angular/router';

import { SimpleRegisterComponent } from './pages/simple-register/simple-register.component';
import { MainPageComponent } from './pages/main-page/main-page.component';

export const appRoutes: Route[] = [
  {
    path: 'simple-register',
    component: SimpleRegisterComponent,
  },
  {
    path: 'main-page',
    component: MainPageComponent,
  },
];
