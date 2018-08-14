import {AbstractControl, ValidatorFn} from "@angular/forms";

export function regexpValidator(regexp: RegExp): ValidatorFn {
  return (control: AbstractControl): {[key: string]: any} => {
    const passed = regexp.test(control.value);
    return passed ? null : {'format': {regexp: regexp, value: control.value}} ;
  };
}
