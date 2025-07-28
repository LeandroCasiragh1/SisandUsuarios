import { Routes } from '@angular/router';
import { AuthGuard } from './auth/auth-guard';
import { HomeComponent } from './home/home';
import { LoginComponent } from './auth/login/login';
import { UsuariosFormComponent } from './pages/usuarios/usuarios-form/usuarios-form';
import { UsuariosListComponent } from './pages/usuarios/usuarios-list/usuarios-list';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
  {
    path: 'usuarios',
    component: UsuariosListComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'usuarios/novo',
    component: UsuariosFormComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'usuarios/editar/:id',
    component: UsuariosFormComponent,
    canActivate: [AuthGuard],
  },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: '**', redirectTo: '/login' },
];
