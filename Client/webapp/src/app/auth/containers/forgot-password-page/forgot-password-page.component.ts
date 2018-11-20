import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from "@angular/core";
import { Store } from "@ngrx/store";
import { IForgotPasswordRequest } from "../../../core/services/service-proxies";
import { BasicPageContainer } from "../../../shared.module/base-components/basic-page-container";
import { ForgotPasswordClean, ForgotPasswordRequest } from "../../actions/auth.actions";
import * as fromAuth from "../../reducers";

@Component({
  selector: "pr-forgot-password-page",
  templateUrl: "./forgot-password-page.component.html",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ForgotPasswordPageComponent extends BasicPageContainer<fromAuth.IState> implements OnInit, OnDestroy {

  constructor(private store: Store<fromAuth.IState>) {
    super(store, fromAuth.getForgotPasswordPagePending, fromAuth.getForgotPasswordPageError);
  }

  public onSubmit(value: IForgotPasswordRequest) {
    this.store.dispatch(new ForgotPasswordRequest(value));
  }

  public ngOnInit() {
    this.store.dispatch(new ForgotPasswordClean({}));
  }

  public ngOnDestroy() {
    this.store.dispatch(new ForgotPasswordClean({}));
  }
}
