import { FormControl } from "@angular/forms"
import { matchSearchPattern } from "./customValidator";

describe('CustomValidator', () => {
    const searchValidator = matchSearchPattern();
    const control = new FormControl('search');
    it('should return null if no input string', () => {
        control.setValue('');
        expect(searchValidator(control)).toEqual({ validSearchValue: false });
    });
    it('should return null if input string is of the correct format', () => {
        control.setValue('AAA131');
        expect(searchValidator(control)).toBeNull();
    });
    it('should return an object if input string is not of the correct format', () => {
        control.setValue('AA131');
        expect(searchValidator(control)).toEqual({ validSearchValue: false });
    });
})