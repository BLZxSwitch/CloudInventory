import { FormControl, Validators } from "@angular/forms";

export class PrValidators {

  public static email(control: FormControl) {
    const validatorResult = Validators.pattern("[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]+")(control);

    return validatorResult && validatorResult.pattern
      ? {email: true}
      : undefined;
  }
}
