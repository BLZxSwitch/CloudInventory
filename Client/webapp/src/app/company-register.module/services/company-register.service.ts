import { Injectable } from "@angular/core";
import { AuthService } from "ng2-ui-auth";
import { of } from "rxjs";
import { Observable } from "rxjs/index";
import { catchError, map, tap } from "rxjs/operators";
import { LoginSuccess } from "../../auth/actions/auth.actions";
import { ICompanyRegisterRequest } from "../../core/services/service-proxies";
import { CompanyRegisterFailureAction } from "../actions/company-register-failure.action";

@Injectable()
export class CompanyRegisterService {

  constructor(private authService: AuthService) {

  }

  public register(model: ICompanyRegisterRequest): Observable<LoginSuccess | CompanyRegisterFailureAction> {
    return this.authService
      .signup(model)
      .pipe(
        tap(({token}) => this.authService.setToken(token)),
        map(({user}) => new LoginSuccess({user})),
        catchError(error => of(new CompanyRegisterFailureAction(error)))
      );
  }
}
