import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { UserComponent } from './user.component';
import { ViewProductDetailModalComponent } from './view-product-detail-modal/view-product-detail-modal.component';


@NgModule({
  declarations: [UserComponent, ViewProductDetailModalComponent],
  imports: [
    CommonModule,
    UserRoutingModule
  ]
})
export class UserModule { }
