import { AbstractControl, FormControl, FormGroup } from '@angular/forms';

export class ValidationHelper {
  static showErrorForControl(
    control: FormControl,
    ...errors: string[]
  ): boolean {
    if (!control) return false;

    return errors.some((error) => control.hasError(error));
  }

  static validateForm(form: FormGroup): boolean {
    if (form.invalid) {
      form.markAllAsTouched();
      form.updateValueAndValidity();
    }
    return form.valid;
  }

  static validateControl(control: FormControl): boolean {
    control.markAsTouched();
    control.updateValueAndValidity();
    return control.valid;
  }

  static nameExistsValidator(arr: string[]) {
    return (control: AbstractControl) => {
      const name = control.value;
      if (arr.some((n) => n.toLowerCase() === name.toLowerCase())) {
        return { nameExists: 'Name already exists' };
      }
      return null;
    };
  }

  static trimFormControlValues(form: FormGroup): void {
    Object.keys(form.controls).forEach((key) => {
      const control = form.get(key);
      if (control && typeof control.value === 'string') {
        control.setValue(control.value.trim());
      }
    });
  }

  static trimFormControlValue(control: FormControl): void {
    control.setValue(control.value.trim());
  }

  static noWhitespaceValidator() {
    return (control: AbstractControl) => {
      if (control.value.trim().length === 0) {
        return { noWhitespace: 'Value cannot be empty' };
      }
      return null;
    };
  }
}
