import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Store } from "@ngrx/store";
import { Subject } from "rxjs/index";
import { first, takeUntil } from "rxjs/operators";
import { BasicPageContainer } from "../../../shared.module/base-components/basic-page-container";
import { SetPasswordClean, SetPasswordRequest } from "../../actions/auth.actions";
import * as fromAuth from "../../reducers";

@Component({
  selector: "pr-set-password-page",
  templateUrl: "./set-password-page.component.html",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SetPasswordPageComponent extends BasicPageContainer<fromAuth.IState> implements OnInit, OnDestroy {

  private ngUnsubscribe$ = new Subject();

  constructor(private store: Store<fromAuth.IState>, private route: ActivatedRoute) {
    super(store, fromAuth.getSetPasswordPagePending, fromAuth.getSetPasswordPageError);
  }

  public onSubmit({password, toSAccepted}) {
    this.route.queryParams
      .pipe(
        first(),
        takeUntil(this.ngUnsubscribe$),
      )
      .subscribe(({userId, code}) => {
        this.store.dispatch(new SetPasswordRequest({userId, code, password, toSAccepted}));
      });
  }

  public ngOnInit() {
    this.store.dispatch(new SetPasswordClean({}));
  }

  public ngOnDestroy() {
    this.ngUnsubscribe$.next();
    this.ngUnsubscribe$.complete();
    this.store.dispatch(new SetPasswordClean({}));
  }
}
