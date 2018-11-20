import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Store } from "@ngrx/store";
import { Subject } from "rxjs/index";
import { first, takeUntil } from "rxjs/operators";
import { BasicPageContainer } from "../../../shared.module/base-components/basic-page-container";
import { ResetPasswordClean, ResetPasswordRequest } from "../../actions/auth.actions";
import * as fromAuth from "../../reducers";

@Component({
  selector: "pr-reset-password-page",
  templateUrl: "./reset-password-page.component.html",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ResetPasswordPageComponent extends BasicPageContainer<fromAuth.IState> implements OnInit, OnDestroy {

  private ngUnsubscribe$ = new Subject();

  constructor(private store: Store<fromAuth.IState>, private route: ActivatedRoute) {
    super(store, fromAuth.getResetPasswordPagePending, fromAuth.getResetPasswordPageError);
  }

  public onSubmit({password}) {
    this.route.queryParams
      .pipe(
        first(),
        takeUntil(this.ngUnsubscribe$),
      )
      .subscribe(({userId, code}) => {
        this.store.dispatch(new ResetPasswordRequest({userId, code, password}));
      });
  }

  public ngOnInit() {
    this.store.dispatch(new ResetPasswordClean({}));
  }

  public ngOnDestroy() {
    this.ngUnsubscribe$.next();
    this.ngUnsubscribe$.complete();
    this.store.dispatch(new ResetPasswordClean({}));
  }
}
