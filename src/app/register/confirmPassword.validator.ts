import { FormGroup, ValidatorFn, ValidationErrors } from '@angular/forms';

export const confirmPasswordChecker: ValidatorFn = (control: FormGroup): ValidationErrors | null => {
    const password = control.get('password');
    const confirmPassword = control.get('confirmPassword');
  
    return password.value !== confirmPassword.value ? { 'unmatchPassword': true } : null;
  };