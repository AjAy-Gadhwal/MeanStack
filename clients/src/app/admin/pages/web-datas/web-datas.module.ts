import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WebDatasRoutingModule } from './web-datas-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { WebDatasComponent } from './web-datas.component';


@NgModule({
  declarations: [WebDatasComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    WebDatasRoutingModule
  ]
})
export class WebDatasModule { }
