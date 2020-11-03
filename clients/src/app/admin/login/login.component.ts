import { AfterViewInit, Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { urlConstant } from 'src/app/constant/urlConstant';
import { Globals } from 'src/app/globals';
import { CommonService } from 'src/app/services/commonService';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, AfterViewInit {

  lognForm: FormGroup;
  constructor(
    public formBuilder: FormBuilder,
    public commonService: CommonService,
    public router: Router
  ) {
    this.createForm();
  }

  ngOnInit(): void {    
  }

  ngAfterViewInit(): void {
    this.loadScripts();
  }

  createForm(): void {
    this.lognForm = this.formBuilder.group({
      username: ['', [Validators.required, Validators.maxLength(100)]],
      password: ['', [Validators.required, Validators.maxLength(100)]],      
      isClicked: [false],      
      isSubmited: [false],      
    });
  }

  get lognFormIsClicked(): FormControl {
    return this.lognForm.get('isClicked') as FormControl;
  }

  get lognFormIsSubmmited(): FormControl {
    return this.lognForm.get('isSubmited') as FormControl;
  }

  lognFormSubmit(): void {
    this.lognFormIsClicked.setValue(true);

    if (this.lognForm.invalid && this.lognFormIsSubmmited.value === false) {
      alert('Please enter valid values.');
      return;
    } else {
      this.lognFormIsSubmmited.setValue(true);

      this.commonService.post(urlConstant.Auth.Login, this.lognForm.value).subscribe((res) => {        
        if (!!res) {
          // this.toasterService.pop('success', 'Success', res.message);
          this.router.navigate(['/admin/page']);   
        } else {          
          // this.toasterService.pop('error', 'Error', res.message);
          this.router.navigate(['/admin/page']);   
        }
      }, (error) => {
        if (error != null) {
          // this.toasterService.pop('error', 'Error', error.message);
        }            
        // this.router.navigate(['/admin/properties/list']);   
      }).add(() => {
        this.lognForm.reset();
        this.lognFormIsClicked.setValue(false);
        this.lognFormIsSubmmited.setValue(false);
        // this.commonService.hideLoading();
      });
    }
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

  isFormSubmittedAndError(controlName: string, errorName: string = '', notError: Array<string> = new Array()): any {
    return Globals.isFormSubmittedAndError(this.lognForm, this.lognForm.get('isClicked').value, controlName, errorName, notError);
  }
}
