import { Routes } from '@angular/router';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  {
    path: 'login',
    loadComponent: () => import('./pages/login/login.component').then(m => m.LoginComponent)
  },
  {
    path: 'employees',
    canActivate: [authGuard],
    loadComponent: () => import('./pages/employee-list/employee-list.component').then(m => m.EmployeeListComponent)
  }
];
