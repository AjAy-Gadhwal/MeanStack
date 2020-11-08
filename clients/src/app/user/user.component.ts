import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import * as $ from "jquery";
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { urlConstant } from '../custom/constant/urlConstant';
import { isValidEmail } from '../custom/validatores/custom.validator';
import { Globals } from '../globals';
import { CommonService } from '../services/commonService';
import { ToastService } from '../services/toast.service';
import { ViewProductDetailModalComponent } from './view-product-detail-modal/view-product-detail-modal.component';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  serverDomain: string = environment.serverUrl;
  products: any = [];
  tempProducts: any = [];
  webData: any = {};
  productSearchCtrl: FormControl;
  contactUsForm: FormGroup;

  constructor(
    public commonService: CommonService,
    public modalService: NgbModal,
    public formBuilder: FormBuilder,
    public toastService: ToastService,
  ) { 
    this.productSearchCtrl = new FormControl('');
    
    this.productSearchCtrl.valueChanges.pipe(debounceTime(500), distinctUntilChanged()).subscribe((search) => {
      console.log('search : ', search);
      this.products = this.tempProducts.filter(product => product.name.indexOf(search) !== -1);
    });
    
    this.getAllProduct();
    this.getWebData();
  }

  ngOnInit(): void {
    this.createForm();
    this.loadScripts();
  }

  createForm(): void {
    this.contactUsForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(100)]],
      email: ['', [Validators.required, Validators.maxLength(100), isValidEmail]],
      subject: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(100)]],
      message: ['', [Validators.required, Validators.maxLength(100)]],
      isClicked: [false],      
      isSubmited: [false],    
    });
  }

  get contactUsFormIsClicked(): FormControl {
    return this.contactUsForm.get('isClicked') as FormControl;
  }

  get contactUsFormIsSubmmited(): FormControl {
    return this.contactUsForm.get('isSubmited') as FormControl;
  }

  getWebData(): void {
    this.commonService.post(urlConstant.WebData.Get).subscribe((res) => {
      if(res && res['status'] === 200) {
        this.webData = res['data'];
      }
    });
  }

  getAllProduct(): void {
    this.commonService.post(urlConstant.Product.Get).subscribe((res) => {
      if(res && res['status'] === 200) {
        this.products = res['data'];
        this.tempProducts = res['data'];
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

  contactUsFormSubmit(): void {
    this.contactUsFormIsClicked.setValue(true);
    this.toastService.removeAll();

    if (this.contactUsForm.invalid && this.contactUsFormIsSubmmited.value === false) {
      this.toastService.error('Please enter valid values.');        
      return;
    } else {
      this.contactUsFormIsSubmmited.setValue(true);

      this.commonService.post(urlConstant.Auth.ContactUs, this.contactUsForm.value).subscribe((res) => {        
        if (!!res && res['status'] === 200) {
          this.toastService.success(`Message sent successfully.`);    
        } else {          
          this.toastService.error(res['message']);
        }
      }, (error) => {
        this.toastService.error(error.message);                        
      }).add(() => {
        this.contactUsForm.reset();
        this.contactUsFormIsClicked.setValue(false);
        this.contactUsFormIsSubmmited.setValue(false);        
      });
    }
  }

  isFormSubmittedAndError(controlName: string, errorName: string = '', notError: Array<string> = new Array()): any {
    return Globals.isFormSubmittedAndError(this.contactUsForm, this.contactUsFormIsClicked.value, controlName, errorName, notError);
  }
}
