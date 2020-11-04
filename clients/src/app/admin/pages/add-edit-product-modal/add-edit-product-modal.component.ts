import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { urlConstant } from 'src/app/custom/constant/urlConstant';
import { Globals } from 'src/app/globals';
import { CommonService } from 'src/app/services/commonService';
import { ToastService } from 'src/app/services/toast.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-add-edit-product-modal',
  templateUrl: './add-edit-product-modal.component.html',
  styleUrls: ['./add-edit-product-modal.component.scss']
})
export class AddEditProductModalComponent implements OnInit {

  @Input() product: any = {};
  
  serverDomain: string = environment.serverUrl;
  isEditProduct: boolean = false;
  productForm: FormGroup;

  constructor(
    public activeModal: NgbActiveModal,
    public formBuilder: FormBuilder,
    public toastService: ToastService,
    public commonService: CommonService,
    public sanitizer: DomSanitizer
  ) {    
  }

  ngOnInit(): void {
    this.isEditProduct = (this.product && this.product['_id']);    
    this.createForm();
  }

  createForm(): void {
    this.productForm = this.formBuilder.group({
      _id: [this.product['_id'] || ''],
      name: [this.product['name'] || '', [Validators.required, Validators.maxLength(100)]],
      description: [this.product['description'] || '', [Validators.maxLength(200)]],
      image: [''],
      imageUrl: [this.product['image'] ? this.serverDomain + this.product['image'] : ''],
      products: new FormArray([]),
      isClicked: [false],      
      isSubmited: [false],    
    });

    if(this.product['products'] && this.product['products'].length > 0) {
      for (const key in this.product['products']) {
        if (Object.prototype.hasOwnProperty.call(this.product['products'], key)) {
          const product = this.product['products'][key];
          this.createProductDetailForm(product);
        }
      }
    }
  }

  createProductDetailForm(product: any = {}): void {
    if(this.productFormProducts.valid) {
      const productDetail = this.formBuilder.group({
        model: [product['model'] || '', [Validators.required, Validators.maxLength(100)]],
        ratio: [product['ratio'] || '', [Validators.maxLength(100)]],
        size: [product['size'] || '', [Validators.maxLength(100)]],
        type: [product['type'] || '', [Validators.maxLength(100)]],
        powerKw: [product['powerKw'] || '', [Validators.maxLength(100)]],
        powerHp: [product['powerHp'] || '', [Validators.maxLength(100)]],
        flange: [product['flange'] || '', [Validators.maxLength(100)]],
        application: [product['application'] || '', [Validators.maxLength(100)]],
        industries: [product['industries'] || '', [Validators.maxLength(100)]],
        isClicked: [false],      
        isSubmited: [false],    
      });

      this.productFormProducts.push(productDetail);
    } else {
      this.toastService.removeAll();
      this.toastService.error("Please enter valid product detail.");
    }
  }

  get productFormIsClicked(): FormControl {
    return this.productForm.get('isClicked') as FormControl;
  }

  get productFormIsSubmmited(): FormControl {
    return this.productForm.get('isSubmited') as FormControl;
  }

  get productFormProducts(): FormArray {
    return this.productForm.get('products') as FormArray;
  }

  productFormSubmit(): void {  
    this.productFormIsClicked.setValue(true);
    this.toastService.removeAll();

    if (this.productForm.invalid && this.productFormIsSubmmited.value === false) {
      this.toastService.error('Please enter valid values.');        
      return;
    } else {
      this.productFormIsSubmmited.setValue(true);
      console.log('this.productForm.value : ', this.productForm.value);
      var reqObj = this.productForm.value;
      delete reqObj['imageUrl'];
      
      if (reqObj['image'] instanceof File) {
        reqObj = Globals.jsonToFormData(reqObj);
      }

      this.commonService.post(urlConstant.Product.Insert, reqObj).subscribe((res) => {        
        if (!!res && res['status'] === 200) {
          this.activeModal.close(res['data']);          
        } else {          
          this.toastService.error(res['message']);
        }
      }, (error) => {
        this.toastService.error(error.message);                        
      }).add(() => {
        this.productForm.reset();
        this.productFormIsClicked.setValue(false);
        this.productFormIsSubmmited.setValue(false);        
      });
    }
  }

  async onChangePropertyCoverImage(event: any) {
    if(event.target.files && event.target.files.length > 0) {
      for (const key in event.target.files) {
        if (Object.prototype.hasOwnProperty.call(event.target.files, key)) {
          const file = event.target.files[key];
          const blobUrl = await Globals.fileToBlobUrl(file);
          
          this.productForm.get('image').setValue(file);
          this.productForm.get('imageUrl').setValue(this.sanitizer.bypassSecurityTrustResourceUrl(blobUrl));
        }
      }   
    }
  }

  isFormSubmittedAndError(controlName: string, errorName: string = '', notError: Array<string> = new Array()): any {
    return Globals.isFormSubmittedAndError(this.productForm, this.productFormIsClicked.value, controlName, errorName, notError);
  }

  isArrayFormSubmittedAndError(formGroup: FormGroup, controlName: string, errorName: string = '', notError: Array<string> = new Array()): any {
    return Globals.isFormSubmittedAndError(formGroup, 1, controlName, errorName, notError);
  }

  trackByFn(index: string = '', item: any = {}) {
    return item._id;
  }
}
