import { Routes } from '@angular/router';
import { dashboardRoutes } from './features/main-layout/dashboard.routes';

export const routes: Routes = [
  { 
    path: '', 
    pathMatch: 'full', 
    redirectTo: 'login' 
  },
  { 
    path: 'login', 
    loadComponent: () => 
      import('./features/auth/login/login.component').then(m => m.default),
  },
  { 
    path: 'register', 
    loadComponent: () => 
      import('./features/auth/register/register.component').then(m => m.default),
  },
  { 
    path: 'dashboard', 
    loadChildren: () => Promise.resolve(dashboardRoutes),
  },
];
