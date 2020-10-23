import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guard/auth.guard';

const routes: Routes = [
  {path: '',redirectTo: 'splash',pathMatch: 'full'},
  {path: 'home',loadChildren: () => import('./pages/home/home.module').then( m => m.HomePageModule),canActivate:[AuthGuard]},
  {path: 'splash',loadChildren: () => import('./pages/splash/splash.module').then( m => m.SplashPageModule)},
  {path: 'log-and-sign',loadChildren: () => import('./pages/log-and-sign/log-and-sign.module').then( m => m.LogAndSignPageModule)},





];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
