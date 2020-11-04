import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import * as $ from "jquery";
import { environment } from 'src/environments/environment';
import { urlConstant } from '../custom/constant/urlConstant';
import { CommonService } from '../services/commonService';
import { ViewProductDetailModalComponent } from './view-product-detail-modal/view-product-detail-modal.component';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  serverDomain: string = environment.serverUrl;
  products: any = [];

  constructor(
    public commonService: CommonService,
    public modalService: NgbModal
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

  openViewProductModal(product: any = {}): void {
    console.log('product : ', product);
    
    const modalRef = this.modalService.open(ViewProductDetailModalComponent, { size: 'xl' });
    modalRef.componentInstance.product = product;    
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

  trackByFn(index: string = '', item: any = {}) {
    return item._id;
  }
}
