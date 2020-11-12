import { AfterViewInit, Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { urlConstant } from 'src/app/custom/constant/urlConstant';
import { Globals } from 'src/app/globals';
import { AlertService } from 'src/app/services/alert.service';
import { AuthService } from 'src/app/services/authService';
import { CommonService } from 'src/app/services/commonService';
import { ToastService } from 'src/app/services/toast.service';

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
    private toastService: ToastService,
    private authService: AuthService,
    private alertService: AlertService,
    public router: Router
  ) {
    const auth = this.authService.adminData();
    const isLogin = auth['token'] && auth['_id'];
    console.log('auth : ', auth);
    
    if (isLogin) {
      this.router.navigate(['/admin/pages/products']);
    }

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
    this.toastService.removeAll();

    if (this.lognForm.invalid && this.lognFormIsSubmmited.value === false) {
      this.toastService.error('Please enter valid values.');        
      return;
    } else {
      this.lognFormIsSubmmited.setValue(true);

      this.commonService.post(urlConstant.Auth.Login, this.lognForm.value).subscribe((res) => {        
        if (!!res && res['status'] === 200) {
          this.authService.adminLogin(res['data']).subscribe((res: any) => {
            this.toastService.success(`Login successfully.`);                        
            this.router.navigate(['/admin/pages/products']);   
          });             
        } else {          
          this.alertService.warningAlert(res['message']);
        }
      }, (error) => {
        this.toastService.error(error.message);                        
      }).add(() => {
        this.lognForm.reset();
        this.lognFormIsClicked.setValue(false);
        this.lognFormIsSubmmited.setValue(false);        
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
    return Globals.isFormSubmittedAndError(this.lognForm, this.lognFormIsClicked.value, controlName, errorName, notError);
  }
}
