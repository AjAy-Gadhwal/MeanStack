import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { urlConstant } from 'src/app/constant/urlConstant';
import { AuthService } from 'src/app/services/authService';
import { CommonService } from 'src/app/services/commonService';
import { environment } from 'src/environments/environment';
import { AddEditProductModalComponent } from './add-edit-product-modal/add-edit-product-modal.component';

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styleUrls: ['./pages.component.scss']
})
export class PagesComponent implements OnInit {

  serverDomain: string = environment.serverUrl;
  products: any = [];

  constructor(
    private modalService: NgbModal,
    public commonService: CommonService,
    public authService: AuthService,
  ) { 
    this.getAllProduct();
  }

  ngOnInit(): void {
    this.loadScripts();
  }

  getAllProduct(): void {
    this.commonService.post(urlConstant.Product.Get).subscribe((res) => {
      if(res && res['status'] === 200) {
        this.products = res['data'];
      }
    });
  }

  loadScripts() {
    const dynamicScripts = ['assets/js/landingPage.js'];
    for (let i = 0; i < dynamicScripts.length; i++) {
      const node = document.createElement('script');
      node.src = dynamicScripts[i];
      node.type = 'text/javascript';
      node.async = false;
      document.getElementsByTagName('head')[0].appendChild(node);
    }
  }

  logout(): void {
    this.authService.adminLogout();
  }

  openAddEditProductModal(product: any = {}): void {
    console.log('product : ', product);
    
    const modalRef = this.modalService.open(AddEditProductModalComponent, { size: 'lg' });
    modalRef.componentInstance.product = product;
    
    modalRef.result.then((res) => {
        console.log('res : ', res);           
        this.getAllProduct();
    }, (reason) => {
        console.log('reason : ', reason);            
    });
  }
}
