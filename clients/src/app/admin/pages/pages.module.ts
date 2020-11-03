import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PagesRoutingModule } from './pages-routing.module';
import { PagesComponent } from './pages.component';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { AddEditProductModalComponent } from './add-edit-product-modal/add-edit-product-modal.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [PagesComponent, AddEditProductModalComponent],
  imports: [
    CommonModule,
    NgbModalModule,
    FormsModule,
    ReactiveFormsModule,
    PagesRoutingModule
  ],
  entryComponents: [
    AddEditProductModalComponent
  ]
})
export class PagesModule { }
