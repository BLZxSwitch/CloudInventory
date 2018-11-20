import { FormControl } from "@angular/forms";
import { getFormControlTouched } from "./get-form-control-touched";

describe("getFormControlTouched", () => {

  describe("touched$ result", () => {

    it("should emit true when markAsTouched is called", () => {
      const control = new FormControl();
      const touched$ = getFormControlTouched(control);

      touched$.subscribe(touched => {
        expect(touched).toBeTruthy();
      });

      control.markAsTouched();
    });

    it("should emit false when markAsUntouched is called", () => {
      const control = new FormControl();
      const touched$ = getFormControlTouched(control);

      touched$.subscribe(touched => {
        expect(touched).toBeFalsy();
      });

      control.markAsUntouched();
    });
  });
});
