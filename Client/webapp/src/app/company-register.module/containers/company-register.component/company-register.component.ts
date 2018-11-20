import { Component } from "@angular/core";
import { Store } from "@ngrx/store";
import { Observable } from "rxjs";
import { ICompanyRegisterRequest } from "../../../core/services/service-proxies";
import { CompanyRegisterAction } from "../../actions/company-register.action";
import { CompanyRegisterErrorStateProvider } from "../../services/company-register.error-state.provider";
import { CompanyRegisterPendingSateProvider } from "../../services/company-register.pending-sate.provider";
import { ICompanyRegisterRootState } from "../../store/company-register.root.state";

@Component({
  styleUrls: ["./company-register.component.scss"],
  templateUrl: "./company-register.component.html"
})
export class CompanyRegisterComponent {
  public pending$: Observable<boolean>;
  public error$: Observable<string | undefined>;

  constructor(
    private store: Store<ICompanyRegisterRootState>,
    private companyRegisterPendingProvider: CompanyRegisterPendingSateProvider,
    private companyRegisterErrorProvider: CompanyRegisterErrorStateProvider) {

    this.pending$ = this.companyRegisterPendingProvider.$value;
    this.error$ = this.companyRegisterErrorProvider.$value;
  }

  public onSubmit(model: ICompanyRegisterRequest) {
    this.store.dispatch(new CompanyRegisterAction(model));
  }
}
