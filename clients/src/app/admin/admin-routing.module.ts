import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  { path: '', loadChildren: () => import('./login/login.module').then(m => m.LoginModule) },
  { path: 'page', loadChildren: () => import('./pages/pages.module').then(m => m.PagesModule) },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
