import { Injectable } from "@angular/core";
import { select, Store } from "@ngrx/store";
import { Observable } from "rxjs";
import { companyRegisterErrorStateSelector } from "../selectors/company-register.error-state.selector";
import { ICompanyRegisterRootState } from "../store/company-register.root.state";

@Injectable()
export class CompanyRegisterErrorStateProvider {
  constructor(private store: Store<ICompanyRegisterRootState>) {

  }

  public get $value(): Observable<string | undefined> {
    return this.store.pipe(select(companyRegisterErrorStateSelector));
  }
}
