import { Injectable } from "@angular/core";
import { AsyncValidatorFn } from "@angular/forms/src/directives/validators";
import { map } from "rxjs/operators";
import { CompanyNameTakenServiceProxy } from "../services/service-proxies";

@Injectable()
export class CompanyNameNotTakenValidator {
  constructor(private companyNameTakenServiceProxy: CompanyNameTakenServiceProxy) {

  }

  public create(): AsyncValidatorFn {
    return control => {
      const companyName = control.value;
      return this.companyNameTakenServiceProxy.isTaken(companyName)
        .pipe(map(isTaken => isTaken === true ? {companyNameTaken: {companyName}} : null));
    };
  }
}
