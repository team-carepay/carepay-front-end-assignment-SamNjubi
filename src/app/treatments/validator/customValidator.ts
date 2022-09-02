import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function matchSearchPattern(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const searchValue = control.value;
    if (!searchValue) {
      return { validSearchValue: false };
    }
    let charObj: any = {};

    for (let i = 0; i < searchValue.length; i++) {
      const searchchar: string = searchValue[i];
      charObj[searchchar] = charObj[searchchar] + 1 || 1;
      if (charObj[searchchar] >= 3) {
        return null;
      }
    }
    return { validSearchValue: false };
  };
}
