import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from "@angular/core";
import { select, Store } from "@ngrx/store";
import { Observable } from "rxjs/index";
import { IOtpSignInRequest } from "../../../core/services/service-proxies";
import { BasicPageContainer } from "../../../shared.module/base-components/basic-page-container";
import { OtpAuthClean, OtpLogin, OtpRedirectClean } from "../../actions/auth.actions";
import * as fromAuth from "../../reducers";

@Component({
  selector: "pr-otp-enter-code",
  templateUrl: "./otp-enter-code.component.html",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OtpEnterCodeComponent extends BasicPageContainer<fromAuth.IState> implements OnInit, OnDestroy {

  public token$ = this.store.pipe(select(fromAuth.getOtpAuthToken));

  public pending$: Observable<boolean>;

  constructor(private store: Store<fromAuth.IState>) {
    super(store, fromAuth.getOtpEnterCodePagePending, fromAuth.getOtpEnterCodePageError);
  }

  public onSubmit(formData: IOtpSignInRequest) {
    this.store.dispatch(new OtpLogin({...formData}));
  }

  public ngOnDestroy() {
    this.store.dispatch(new OtpAuthClean({}));
    this.store.dispatch(new OtpRedirectClean({}));
  }

  public ngOnInit() {
    this.store.dispatch(new OtpRedirectClean({}));
  }
}
