import { Component, EventEmitter, Input, Output, QueryList, ViewChildren } from "@angular/core";
import { AbstractControl, FormGroup } from "@angular/forms";
import { MarkAsTouchedService } from "../../../core/services/mark-as-touched.service";
import { RoutesService } from "../../../core/services/routes.service";
import { CompanyRegisterRequest, ICompanyRegisterRequest } from "../../../core/services/service-proxies";
import { ScrollIntoViewOnInvalidDirective } from "../../../shared.module/directives/scroll-into-view-on-invalid.directive";
import { now } from "../../../shared/date/now";
import { CompanyRegisterFormProvider } from "../../services/company-register-form.provider";
import {
  ICompanyRegisterFirstFormModel,
  ICompanyRegisterSecondFormModel,
  ICompanyRegisterThirdFormModel
} from "./company-register.form.model";

@Component({
  selector: "pr-company-register-form",
  styleUrls: ["./company-register.form.component.scss"],
  templateUrl: "./company-register.form.component.html"
})
export class CompanyRegisterFormComponent {

  public get authLoginUrl() {
    return this.routesService.authLogin();
  }

  @Input() public pending: boolean;

  @Input() public errorMessage: string | undefined;

  @Output() public submitted = new EventEmitter<ICompanyRegisterRequest>();

  @ViewChildren(ScrollIntoViewOnInvalidDirective) public scrollIntoViewOnInvalidDirectives: QueryList<ScrollIntoViewOnInvalidDirective>;

  public firstFormGroup: FormGroup;
  public secondFormGroup: FormGroup;
  public thirdFormGroup: FormGroup;

  public maxDateOfBirth = now();

  constructor(private companyRegisterFormProvider: CompanyRegisterFormProvider,
              private markAsTouchedService: MarkAsTouchedService,
              private routesService: RoutesService) {

    this.createForm();
  }

  public get captchaGroup(): AbstractControl {
    return this.thirdFormGroup.get("recaptchaGroup");
  }

  public showErrorsForFirstStep() {
    this.markAsTouchedService.form(this.firstFormGroup);
    if (this.scrollIntoViewOnInvalidDirectives && this.scrollIntoViewOnInvalidDirectives.toArray().length > 0) {
      this.scrollIntoViewOnInvalidDirectives.toArray()[0].scroll();
    }
  }

  public showErrorsForSecondStep() {
    this.markAsTouchedService.form(this.secondFormGroup);
    if (this.scrollIntoViewOnInvalidDirectives && this.scrollIntoViewOnInvalidDirectives.toArray().length > 1) {
      this.scrollIntoViewOnInvalidDirectives.toArray()[1].scroll();
    }
  }

  public submit() {
    if (this.thirdFormGroup.valid) {
      const firstFormValue = this.firstFormGroup.value as ICompanyRegisterFirstFormModel;
      const secondFormValue = this.secondFormGroup.value as ICompanyRegisterSecondFormModel;
      const thirdFormValue = this.thirdFormGroup.value as ICompanyRegisterThirdFormModel;

      const request = new CompanyRegisterRequest({
        companyName: firstFormValue.companyName,
        companyPhone: firstFormValue.companyPhone,
        address: firstFormValue.address,
        city: firstFormValue.city,
        zip: firstFormValue.zip,
        firstName: secondFormValue.firstName,
        lastName: secondFormValue.lastName,
        patronymicName: secondFormValue.patronymicName,
        email: secondFormValue.email,
        password: secondFormValue.password,
        dateOfBirth: secondFormValue.dateOfBirth,
        gender: secondFormValue.gender,
        validationToken: this.captchaGroup.value.recaptcha,
        toSAccepted: thirdFormValue.toSAccepted
      });

      this.submitted.emit(request);
    } else {
      this.markAsTouchedService.form(this.secondFormGroup);
    }
  }

  private createForm(): void {
    const [firstFormGroup, secondFormGroup, thirdFormGroup] = this.companyRegisterFormProvider.get();

    this.firstFormGroup = firstFormGroup;
    this.secondFormGroup = secondFormGroup;
    this.thirdFormGroup = thirdFormGroup;
  }
}
