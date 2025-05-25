import { Routes } from '@angular/router';
import { OmpDashboardComponent } from './omp-dashboard/omp-dashboard.component';
import { RegionDetailComponent } from './region-detail/region-detail.component';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'dashboard' },
  { path: 'dashboard', component: OmpDashboardComponent },
  { path: 'region-detail/:regionId', component: RegionDetailComponent },
];
