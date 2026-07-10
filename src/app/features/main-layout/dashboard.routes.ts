import { Routes } from '@angular/router';
import { MainLayoutComponent } from './views/main-layout/main-layout.component';
import { authGuard } from '../../core/guards/auth.guard';

export const dashboardRoutes: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
    canActivate: [authGuard],
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'inicio',
      },
      {
        path: 'inicio',
        loadComponent: () =>
          import('./views/main-dashboard/main-dashboard.component').then(
            (m) => m.MainDashboardComponent
          ),
      },
    ],
  },
];