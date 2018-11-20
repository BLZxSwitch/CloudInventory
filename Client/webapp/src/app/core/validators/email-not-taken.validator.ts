import { Injectable } from "@angular/core";
import { AsyncValidatorFn } from "@angular/forms/src/directives/validators";
import { map } from "rxjs/operators";
import { EmailTakenServiceProxy } from "../services/service-proxies";

@Injectable()
export class EmailNotTakenValidator {
  constructor(private emailTakenServiceProxy: EmailTakenServiceProxy) {

  }

  public create(selfEmployeeId?): AsyncValidatorFn {
    return control => {
      const email = control.value;
      return this.emailTakenServiceProxy.isTaken(email, selfEmployeeId)
        .pipe(map(isTaken => isTaken === true ? {emailTaken: {email}} : null));
    };
  }
}
