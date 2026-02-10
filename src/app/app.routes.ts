import { Routes } from '@angular/router';
import { AuthGuard } from './core/auth.guard';
import { CatBreedsComponent } from './features/cats/cat-breeds.component';
import { LoginComponent } from './features/auth/login.component';
import { RegisterComponent } from './features/auth/register.component';
import { ProfileComponent } from './features/user/profile.component';

export const routes: Routes = [
  { path: 'cats', component: CatBreedsComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard] },
  { path: '', pathMatch: 'full', redirectTo: 'cats' },
  { path: '**', redirectTo: 'cats' }
];
