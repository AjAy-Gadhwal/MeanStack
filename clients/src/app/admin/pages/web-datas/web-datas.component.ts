import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { urlConstant } from 'src/app/custom/constant/urlConstant';
import { Globals } from 'src/app/globals';
import { CommonService } from 'src/app/services/commonService';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-web-datas',
  templateUrl: './web-datas.component.html',
  styleUrls: ['./web-datas.component.scss']
})
export class WebDatasComponent implements OnInit {

  webData: any = {};
  webDataForm: FormGroup;

  constructor(
    public formBuilder: FormBuilder,
    public toastService: ToastService,
    public commonService: CommonService,
  ) {
    this.getWebData();
  }

  ngOnInit(): void {    
  }

  getWebData(): void {
    this.commonService.post(urlConstant.WebData.Get).subscribe((res) => {
      if(res && res['status'] === 200) {
        this.webData = res['data'];
        this.createForm(this.webData);
      }
    });
  }

  createForm(data: any = {}): void {
    this.webDataForm = this.formBuilder.group({
      _id: [data['_id'] || ''],
      aboutUs: [data['aboutUs'] || '', [Validators.maxLength(2000)]],
      isClicked: [false],      
      isSubmited: [false],    
    });
  }
  
  get webDataFormIsClicked(): FormControl {
    return this.webDataForm.get('isClicked') as FormControl;
  }

  get webDataFormIsSubmmited(): FormControl {
    return this.webDataForm.get('isSubmited') as FormControl;
  }

  webDataFormSubmit(): void {  
    this.webDataFormIsClicked.setValue(true);
    this.toastService.removeAll();

    if (this.webDataForm.invalid && this.webDataFormIsSubmmited.value === false) {
      this.toastService.error('Please enter valid values.');        
      return;
    } else {
      this.webDataFormIsSubmmited.setValue(true);
      var reqObj = this.webDataForm.value;
      
      this.commonService.post(urlConstant.WebData.Insert, reqObj).subscribe((res) => {        
        if (!!res && res['status'] === 200) {
          this.toastService.success('Data updated successfully.');
        } else {          
          this.toastService.error(res['message']);
        }
      }, (error) => {
        this.toastService.error(error.message);                        
      }).add(() => {
        this.webDataFormIsClicked.setValue(false);
        this.webDataFormIsSubmmited.setValue(false);        
      });
    }
  }

  isFormSubmittedAndError(controlName: string, errorName: string = '', notError: Array<string> = new Array()): any {
    return Globals.isFormSubmittedAndError(this.webDataForm, this.webDataFormIsClicked.value, controlName, errorName, notError);
  }
}
