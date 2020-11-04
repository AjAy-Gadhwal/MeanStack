import { Injectable } from '@angular/core';
import { of, Observable, BehaviorSubject } from 'rxjs';
import { urlConstant } from '../custom/constant/urlConstant';
import { CommonService } from './commonService';
import { ToastService } from './toast.service';

@Injectable({
    providedIn: 'root',
})
export class AuthService {

    public admin: BehaviorSubject<any>;
    
    constructor(
        public commonService: CommonService,
        public toastService: ToastService
    ) {

        const adminJson = localStorage.getItem('adminAuth') ? JSON.parse(localStorage.getItem('adminAuth')) : {};    
        this.admin = new BehaviorSubject<any>(adminJson);
    }

    adminData(): any {
        return this.admin.getValue() || {};
    }

    adminId(): any {
        const adminData = this.adminData();
        return adminData['_id'];
    }

    adminLogin(adminJson: any = {}): Observable<any> {    
        localStorage.setItem('adminAuth', JSON.stringify(adminJson)); 
        if (!!adminJson) {
            this.admin.next(adminJson);               
        }

        return of(true);
    }

    adminLogout(): void {
        const reqBody = {
          id: this.admin.getValue()
        };
        
        this.commonService.post(urlConstant.Auth.Logout, reqBody).subscribe((res) => {
          this.toastService.success(`Logout successfully.`);                                                    
          this.clearAdminData();                      
          window.location.href = '/admin/login';  
        });        
    }

    clearAdminData(): void {
        localStorage.removeItem('adminAuth');
        localStorage.clear();
        this.admin.next(null);
    }
}