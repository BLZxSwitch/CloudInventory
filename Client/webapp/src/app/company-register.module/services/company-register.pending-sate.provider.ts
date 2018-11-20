import { Injectable } from "@angular/core";
import { select, Store } from "@ngrx/store";
import { Observable } from "rxjs";
import { companyRegisterPendingStateSelector } from "../selectors/company-register.pending-state.selector";
import { ICompanyRegisterRootState } from "../store/company-register.root.state";

@Injectable()
export class CompanyRegisterPendingSateProvider {
  constructor(private store: Store<ICompanyRegisterRootState>) {

  }

  public get $value(): Observable<boolean> {
    return this.store.pipe(select(companyRegisterPendingStateSelector));
  }
}
