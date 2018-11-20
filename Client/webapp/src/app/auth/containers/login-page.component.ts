import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from "@angular/core";
import { Store} from "@ngrx/store";
import { ISignInRequest } from "../../core/services/service-proxies";
import { BasicPageContainer } from "../../shared.module/base-components/basic-page-container";
import * as AuthActions from "../actions/auth.actions";
import * as fromAuth from "../reducers";

@Component({
  selector: "pr-login-page",
  template: `
    <pr-unauthorized-layout>
      <pr-login-form
        (submitForm)="onSubmit($event)"
        [pending]="pending$ | async"
        [errorMessage]="error$ | prDescribe | async">
      </pr-login-form>
    </pr-unauthorized-layout>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginPageComponent extends BasicPageContainer<fromAuth.IState> implements OnInit, OnDestroy {

  constructor(private store: Store<fromAuth.IState>) {
    super(store, fromAuth.getLoginPagePending, fromAuth.getLoginPageError);
  }

  public onSubmit($event: ISignInRequest) {
    this.store.dispatch(new AuthActions.Login($event));
  }

  public ngOnInit() {
    this.store.dispatch(new AuthActions.LoginClean({}));
  }

  public ngOnDestroy() {
    this.store.dispatch(new AuthActions.LoginClean({}));
  }
}
