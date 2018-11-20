import { Injectable } from "@angular/core";
import { FormGroup } from "@angular/forms";

@Injectable({
  providedIn: "root"
})
export class MarkAsTouchedService {
  public form(form: FormGroup): void {
    Object.keys(form.controls)
      .forEach(key => {
        const item = form.controls[key];
        if (item instanceof FormGroup) {
          this.form(item as FormGroup);
        }
        return item.markAsTouched();
      });
  }
}
