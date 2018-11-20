import { FormControl } from "@angular/forms";
import { Observable } from "rxjs";

export function getFormControlTouched(input: FormControl) {
  // TODO monkey patching for now, change when angular introduces observable https://github.com/angular/angular/issues/10887
  return Observable.create(observer => {
    const markAsTouched = input.markAsTouched;
    const markAsUntouched = input.markAsUntouched;
    input.markAsTouched = (...args) => {
      markAsTouched.apply(input, args);
      observer.next(true);
    };
    input.markAsUntouched = (...args) => {
      markAsUntouched.apply(input, args);
      observer.next(false);
    };
  });
}
