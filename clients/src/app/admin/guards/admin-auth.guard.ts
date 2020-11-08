import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/authService';

@Injectable()
export class AdminAuthGuard implements CanActivate {
    
    constructor(
        private router: Router,
        private authService: AuthService
    ) {}

    canActivate() {
        const auth = this.authService.adminData();
        
        const isLogin = auth['token'] && auth['_id'];
        console.log('isLogin : ', isLogin);
        
        if (isLogin) {
            return true;
        }

        this.router.navigate(['/admin/login']);
        return false;
    }
}
