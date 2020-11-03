import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgxTrimDirectiveModule } from 'ngx-trim-directive';
import { NgbModule, NgbToastModule } from '@ng-bootstrap/ng-bootstrap';
import { ToastModalComponent } from './custom-components/toast-modal/toast-modal.component';
import { AdminAuthGuard } from './admin/guards/admin-auth.guard';
import { headerIntercepter } from './admin/intercepters/headerIntercepter';

@NgModule({
  declarations: [
    AppComponent,
    ToastModalComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    NgxTrimDirectiveModule,
    AppRoutingModule,
    NgbModule,
    NgbToastModule
  ],  
  entryComponents: [
    ToastModalComponent
  ],
  providers: [
    AdminAuthGuard,
    { provide: HTTP_INTERCEPTORS, useClass: headerIntercepter, multi:true },
  ],  
  bootstrap: [AppComponent]
})
export class AppModule { }
