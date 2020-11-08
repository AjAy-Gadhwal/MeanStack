import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { urlConstant } from 'src/app/custom/constant/urlConstant';
import { AlertService } from 'src/app/services/alert.service';
import { AuthService } from 'src/app/services/authService';
import { CommonService } from 'src/app/services/commonService';
import { ToastService } from 'src/app/services/toast.service';
import { ViewProductDetailModalComponent } from 'src/app/user/view-product-detail-modal/view-product-detail-modal.component';
import { environment } from 'src/environments/environment';
import { AddEditProductModalComponent } from './add-edit-product-modal/add-edit-product-modal.component';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

  serverDomain: string = environment.serverUrl;
  products: any = [];
  tempProducts: any = [];
  productSearchCtrl: FormControl;

  constructor(
    private modalService: NgbModal,
    public commonService: CommonService,
    public authService: AuthService,
    public alertService: AlertService,
    public toastService: ToastService,
  ) { 
    this.productSearchCtrl = new FormControl('');

    this.productSearchCtrl.valueChanges.pipe(debounceTime(500), distinctUntilChanged()).subscribe((search) => {
      console.log('search : ', search);
      this.products = this.tempProducts.filter(product => product.name.indexOf(search) !== -1);
    });

    this.getAllProduct();
  }

  ngOnInit(): void {
    this.loadScripts();
  }

  getAllProduct(): void {
    this.commonService.post(urlConstant.Product.Get).subscribe((res) => {
      if(res && res['status'] === 200) {
        this.products = res['data'];
        this.tempProducts = res['data'];
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

  openAddEditProductModal(product: any = {}): void {
    console.log('product : ', product);
    
    const modalRef = this.modalService.open(AddEditProductModalComponent, { size: 'xl' });
    modalRef.componentInstance.product = product;
    
    modalRef.result.then((res) => {
        console.log('res : ', res);           
        this.getAllProduct();
    }, (reason) => {
        console.log('reason : ', reason);            
    });
  }

  
  openViewProductModal(product: any = {}): void {
    console.log('product : ', product);
    
    const modalRef = this.modalService.open(ViewProductDetailModalComponent, { size: 'xl' });
    modalRef.componentInstance.product = product;    
  }

  deleteProduct(product: any = {}): void { 
    this.alertService.confirmationAlert('', 'This product deleted permanetaly.').then((res: any) => {
      console.log('Is Confirmed : ', res);
      if(res && res.value === true) {
          this.commonService.delete(urlConstant.Product.Delete, product['_id']).subscribe((res: any) => {
              console.log('Res : ', res);
              if(res['status'] === 200) {
                  this.toastService.success('Payment method deleted successfully.');                                 
              } else {
                  this.toastService.error(res['message']);           
              }
  
              this.getAllProduct();
          });
      } 
    });       
  }

  trackByFn(index: string = '', item: any = {}) {
    return item._id;
  }
}
