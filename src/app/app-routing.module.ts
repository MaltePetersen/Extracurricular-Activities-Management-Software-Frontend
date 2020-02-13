import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then(m => m.LoginPageModule),
    canActivate: [AuthGuard],
    data: {
      role: 'NULL'
    }
  },
  {
    path: 'register',
    loadChildren: () => import('./pages/parent/register/register.module')
    .then(m => m.RegisterPageModule),
    canActivate: [AuthGuard],
    data: {
      role: 'NULL'
    }
  },
{ path: 'employee', 
  loadChildren: () => import('./pages/betreuer/employee.module').then(m => m.EmployeeModule),
  canActivate: [AuthGuard],
  data: {
    role: 'ROLE_EMPLOYEE'
  }
},
{ path: 'parent', 
loadChildren: () => import('./pages/parent/parent.module').then(m => m.ParentModule),
canActivate: [AuthGuard],
data: {
  role: 'ROLE_PARENT'
}}
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
