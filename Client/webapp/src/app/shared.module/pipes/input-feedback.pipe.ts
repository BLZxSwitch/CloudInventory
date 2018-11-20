import { Pipe, PipeTransform } from "@angular/core";
import { TranslateService } from "@ngx-translate/core";

@Pipe({
  name: "prInputFeedback"
})
export class InputFeedbackPipe implements PipeTransform {
  constructor(private translate: TranslateService) {
  }

  public transform(value: any, args?: any): any {
    value = value || {};

    if (value.required) {
      return this.translate.instant("FORM.ERROR.REQUIRED");
    }

    if (value.min) {
      return this.translate.instant("FORM.ERROR.MIN",  {min: value.min.min});
    }

    if (value.max) {
      return this.translate.instant("FORM.ERROR.MAX",  {max: value.max.max});
    }

    if (value.minlength) {
      return this.translate.instant("FORM.ERROR.MIN_LENGTH",  {minLength: value.minlength.requiredLength});
    }

    if (value.maxlength) {
      return this.translate.instant("FORM.ERROR.MAX_LENGTH",  {maxLength: value.maxlength.requiredLength});
    }

    if (value.email) {
      return this.translate.instant("FORM.ERROR.EMAIL");
    }

    if (value.emailTaken) {
      return this.translate.instant("FORM.ERROR.EMAIL-IS-TAKEN");
    }

    if (value.companyNameTaken) {
      return this.translate.instant("FORM.ERROR.COMPANY_NAME-IS-TAKEN");
    }

    if (value.confirmPassword) {
      return this.translate.instant("FORM.ERROR.CONFIRM_PASSWORD");
    }

    if (value.equalTo) {
      return this.translate.instant("FORM.ERROR.CONFIRM_PASSWORD");
    }

    return "";
  }
}
