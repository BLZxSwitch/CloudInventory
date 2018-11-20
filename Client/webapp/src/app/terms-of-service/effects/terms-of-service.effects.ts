import { Injectable } from "@angular/core";
import { Actions, Effect, ofType } from "@ngrx/effects";
import { Store } from "@ngrx/store";
import { exhaustMap, map } from "rxjs/operators";
import { Logout } from "../../auth/actions/auth.actions";
import { TermsOfServiceServiceProxy } from "../../core/services/service-proxies";
import { EffectUtilsService } from "../../shared/services/effect-utils.service";
import {
  TermsOfServiceActionTypes,
  TermsOfServiceApproveClosed,
  TermsOfServiceApproveRequest,
  TermsOfServiceApproveSuccess,
  TermsOfServiceDecline
} from "../actions/terms-of-service.actions";
import { TermsOfServiceDialogComponent } from "../containers/terms-of-service-dialog/terms-of-service-dialog.component";

@Injectable()
export class TermsOfServiceEffects {

  @Effect()
  public showAcceptDialog$ = this.effectUtilsService.createOpenDialogEffect([TermsOfServiceActionTypes.Approve],
    [TermsOfServiceActionTypes.ApproveSuccess],
    TermsOfServiceDialogComponent,
    TermsOfServiceApproveClosed,
    TermsOfServiceDecline);

  @Effect()
  public approveRequest$ = this.actions$.pipe(
    ofType<TermsOfServiceApproveRequest>(TermsOfServiceActionTypes.ApproveRequest),
    exhaustMap(() => this.termsOfServiceServiceProxy.accept(true)
      .pipe(
        map(() => new TermsOfServiceApproveSuccess())
      )
    )
  );

  @Effect()
  public decline$ = this.actions$.pipe(
    ofType<TermsOfServiceDecline>(TermsOfServiceActionTypes.Decline),
    map(() => new Logout()),
  );

  constructor(private store: Store<any>,
              private actions$: Actions,
              private effectUtilsService: EffectUtilsService,
              private termsOfServiceServiceProxy: TermsOfServiceServiceProxy) {
  }
}
