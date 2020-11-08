import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { UserComponent } from './user.component';
import { ViewProductDetailModalComponent } from './view-product-detail-modal/view-product-detail-modal.component';
import { NoDataFoundModule } from '../custom/components/no-data-found/no-data-found.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [UserComponent, ViewProductDetailModalComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NoDataFoundModule,
    UserRoutingModule
  ]
})
export class UserModule { }
