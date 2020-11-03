import { Injectable } from '@angular/core';
import Swal from 'sweetalert2'
import { Observable, of } from 'rxjs';

/**
 * This component is used to manage alert.
 *
 * @export
 * @class AlertService
 */
@Injectable({
  providedIn: 'root'
})
export class AlertService {
    constructor() {}

    warningAlert(msg: string): void {
        Swal.fire('Oops!', msg, 'warning');
    }

    errorAlert(msg: string): void {
      Swal.fire('Oops!', msg, 'error');
    }

    infoAlert(msg: string): void {
      Swal.fire('Infomation!', msg, 'info');
    }

    successAlert(msg: string): void {
      Swal.fire('Success!', msg, 'success');
    }

    loaderAlert(msg: string = 'Loading...'): void {
      Swal.fire({        
        html: `
        <div id="loader">
          <div class="dot"></div>
          <div class="dot"></div>
          <div class="dot"></div>
          <div class="dot"></div>
          <div class="dot"></div>
          <div class="dot"></div>
          <div class="dot"></div>
          <div class="dot"></div>
          <div class="loading">${msg}</div>
        </div>
        `,
        width: 600,
        padding: '3em',
        showCloseButton: false,
        showCancelButton: false,
        showConfirmButton: false,
        allowOutsideClick: false,
        background: '#fff0',
        backdrop: `rgba(0, 0, 0, 0.6)`
      })
    }

    confirmationAlert(title: string = 'Are you sure?', msg: string): Promise<any> {
      return new Promise((resolve, reject) => {
        Swal.fire({
          title: title,
          text: msg,
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          confirmButtonText: 'Confirm',
          cancelButtonColor: '#d33',        
          cancelButtonText: 'Cancel'
        }).then((result) => {
          resolve(result);
        })
      });
    }

    closeAlert(): void { 
      Swal.close();
    }
}
