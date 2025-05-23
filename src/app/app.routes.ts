import { Routes } from '@angular/router';
import { OmpDashboardComponent } from './omp-dashboard/omp-dashboard.component';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'dashboard' },
  { path: 'dashboard', component: OmpDashboardComponent },
];
