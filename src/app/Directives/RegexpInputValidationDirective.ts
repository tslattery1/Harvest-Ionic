import {Directive, Input} from "@angular/core";
import {AbstractControl, NG_VALIDATORS, Validator} from "@angular/forms";
import {regexpValidator} from "../Validators/RegexpValidator";

@Directive({
  selector: '[regexp]',
  providers: [{provide: NG_VALIDATORS, useExisting: RegexpInputValidationDirective, multi: true}]
})
export class RegexpInputValidationDirective implements Validator {
  @Input('regexp') regexp: string;

  validate(control: AbstractControl): {[key: string]: any} {
    return this.regexp ? regexpValidator(new RegExp(this.regexp, 'i'))(control) : null;
  }
}
