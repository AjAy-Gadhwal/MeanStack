import { AbstractControl, ValidationErrors, ValidatorFn, FormGroup } from '@angular/forms';
/**
 * isAlphabet is checked string is alphabet or not.
 *
 * @export
 * @param {AbstractControl} control
 * @returns {({ [key: string]: boolean } | null)} return data of result.
 */
export function isAlphabet(control: AbstractControl): { [key: string]: boolean } | null {   
    const strRegEx = new RegExp('^[a-zA-Z ]+$');
    
    if (control.value !== undefined && !strRegEx.test(control.value)) {
        return { isAlphabet: true };
    } 

    return null;      
}

/**
 * isNumber is checked string is number or not.
 *
 * @export
 * @param {AbstractControl} control
 * @returns {({ [key: string]: boolean } | null)} return data of result.
 */
export function isNumber(control: AbstractControl): { [key: string]: boolean } | null {   
    const strRegEx = new RegExp('^[0-9]+$');
    
    if (control.value !== undefined && !strRegEx.test(control.value)) {
        return { isNumber: true };
    } 

    return null;     
}

/**
 * isNumber is checked string is number or not.
 *
 * @export
 * @param {AbstractControl} control
 * @returns {({ [key: string]: boolean } | null)} return data of result.
 */
export function isNumberAndAlphabet(control: AbstractControl): { [key: string]: boolean } | null {   
    const strRegEx = new RegExp('^[0-9a-zA-Z]+$');
    
    if (control.value !== undefined && !strRegEx.test(control.value)) {
        return { isNumberAndAlphabet: true };
    } 

    return null;     
}

/**
 * isNumber is checked string is number or blank.
 *
 * @export
 * @param {AbstractControl} control
 * @returns {({ [key: string]: boolean } | null)} return data of result.
 */
export function isNumberWithBlank(control: AbstractControl): { [key: string]: boolean } | null {   
    const strRegEx = new RegExp('^[0-9]*$');
    
    if (control.value !== undefined && !strRegEx.test(control.value)) {
        return { isNumberWithBlank: true };
    } 

    return null;     
}

/**
 * isValidEmail is checked string is valid email or not.
 *
 * @export
 * @param {AbstractControl} control
 * @returns {({ [key: string]: boolean } | null)} return data of result.
 */

export function isDecimal(control: AbstractControl): { [key: string]: boolean } | null {       
    const strRegEx = new RegExp(/^(\d*\.)?\d+$/);
    
    if (control.value !== undefined && !strRegEx.test(control.value)) {
        return { isDecimal: true };
    } 

    return null;     
}

/**
 * isValidEmail is checked string is valid email or not.
 *
 * @export
 * @param {AbstractControl} control
 * @returns {({ [key: string]: boolean } | null)} return data of result.
 */

export function isDecimalWithBlank(control: AbstractControl): { [key: string]: boolean } | null {       
    const strRegEx = new RegExp(/^(\d*\.)?\d*$/);
    
    if (control.value !== undefined && !strRegEx.test(control.value)) {
        return { isDecimalWithBlank: true };
    } 

    return null;     
}

/**
 * Check the givent email valid or not.
 *
 * @export
 * @param {AbstractControl} control Pass cotral data.
 * @returns {({ [key: string]: boolean } | null)} return data of result.
 */
export function isValidEmail(control: AbstractControl): { [key: string]: boolean } | null {   
    const strRegEx = new RegExp(/^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/);
    
    if (control.value !== undefined && !strRegEx.test(control.value)) {
        return { isValidEmail: true };
    } 

    return null;     
}
/**
 * isPassword is checked string is valid Password or not.
 *
 * @export
 * @param {AbstractControl} control
 * @returns {({ [key: string]: boolean } | null)} return data of result.
 */
export function isPassword(control: AbstractControl): { [key: string]: boolean } | null {   
    const strRegEx = new RegExp('^[a-zA-Z0-9_@]+$');
    
    if (control.value !== undefined && !strRegEx.test(control.value)) {
        return { isPassword: true };
    } 
    return null;     
}



export function MustMatch(controlName: string, matchingControlName: string) {
    return (formGroup: FormGroup) => {
        const control = formGroup.controls[controlName];
        const matchingControl = formGroup.controls[matchingControlName];

        if (matchingControl.errors && !matchingControl.errors.mustMatch) {
            // return if another validator has already found an error on the matchingControl
            return;
        }

        // set error on matchingControl if validation fails
        if (control.value !== matchingControl.value) {
            matchingControl.setErrors({ mustMatch: true });
        } else {
            matchingControl.setErrors(null);
        }
    }
}