import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductsRoutingModule } from './products-routing.module';
import { ProductsComponent } from './products.component';
import { AddEditProductModalComponent } from './add-edit-product-modal/add-edit-product-modal.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { NoDataFoundModule } from 'src/app/custom/components/no-data-found/no-data-found.module';


@NgModule({
  declarations: [ProductsComponent, AddEditProductModalComponent],
  imports: [
    CommonModule,
    NgbModalModule,
    FormsModule,
    ReactiveFormsModule,
    NoDataFoundModule,    
    ProductsRoutingModule
  ],
  entryComponents: [
    AddEditProductModalComponent
  ]
})
export class ProductsModule { }
