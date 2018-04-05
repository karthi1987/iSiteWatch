import { Directive, Input, OnChanges, SimpleChanges } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, Validator, ValidatorFn, Validators } from '@angular/forms';

/** A hero's password can't match the given regular expression */
export function forbiddenPasswordValidator(nameRe: RegExp): ValidatorFn {
  return (control: AbstractControl): {[key: string]: any} => {
    const strongRegex = new RegExp('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,}');
    const forbidden = strongRegex.test(control.value);
    return !forbidden ? { 'forbiddenPassword': { value: control.value } } : null;
  };
}

@Directive({
  selector: '[appForbiddenPassword]',
  providers: [{provide: NG_VALIDATORS, useExisting: ForbiddenValidatorDirective, multi: true}]
})
export class ForbiddenValidatorDirective implements Validator {
  @Input('appForbiddenPassword') forbiddenPassword: string;
  validate(control: AbstractControl): {[key: string]: any} {
   return this.forbiddenPassword ? forbiddenPasswordValidator(new RegExp(this.forbiddenPassword, 'i'))(control) : null;
  }
}

/*
Copyright 2017-2018 Google Inc. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/