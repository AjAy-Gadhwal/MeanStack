import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WebDatasComponent } from './web-datas.component';


const routes: Routes = [
  { path: '', component: WebDatasComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WebDatasRoutingModule { }
