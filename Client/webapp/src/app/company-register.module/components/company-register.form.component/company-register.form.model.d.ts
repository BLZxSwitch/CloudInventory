import { FormGroup } from "@angular/forms";
import { Gender } from "../../../core/services/service-proxies";

export interface ICompanyRegisterFirstFormModel {
  companyName: string;
  companyPhone: string;
  address: string;
  zip: string;
  city: string;
  inn: string;
}
export interface ICompanyRegisterSecondFormModel {
  gender: Gender;
  firstName: string;
  lastName: string;
  patronymicName: string;
  email: string;
  password: string;
  confirmPassword: string;
  dateOfBirth: number;
}

export interface ICompanyRegisterThirdFormModel {
  toSAccepted: boolean;
  recaptchaGroup: FormGroup;
}
