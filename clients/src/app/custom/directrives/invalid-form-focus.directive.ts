import { Directive, ElementRef, HostListener, NgModule } from '@angular/core';

@Directive({
  selector: '[appInvalidFormFocus]'
})
export class InvalidFormFocusDirective {

  constructor(private el: ElementRef) {}

  @HostListener('submit')
  onFormSubmit() {
    const invalidControl: HTMLElement = this.el.nativeElement.querySelector('.form-group .ng-invalid');

    console.log('invalidControl : ', invalidControl);
    
    if (invalidControl) {   
      var parentElement: HTMLElement = this.findAncestor(invalidControl) || invalidControl;
      parentElement.scrollIntoView({ behavior: 'smooth', block: 'start', inline: "start" });

      setTimeout(() => {
        invalidControl.focus()
      }, 500);
    }
  }

  findAncestor(el: HTMLElement): HTMLElement {
    while ((el = el.parentElement) && !el.classList.contains('form-group'));
    return el;
  }
}
