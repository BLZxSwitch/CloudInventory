import { Injectable } from "@angular/core";
import { Actions, Effect, ofType } from "@ngrx/effects";
import { ROUTER_NAVIGATION } from "@ngrx/router-store";
import { defer } from "rxjs";
import { NEVER } from "rxjs/internal/observable/never";
import { of } from "rxjs/internal/observable/of";
import { filter, map } from "rxjs/operators";
import { BreakpointsService } from "../../core/services/breakpoints.service";
import { SidenavClose } from "../actions/layout.actions";

@Injectable()
export class LayoutEffects {

  // hide sidenav when load on mobile
  @Effect()
  public init$ = defer(() => this.breakpointsService.isMobile ? of(new SidenavClose()) : NEVER);

  @Effect()
  public navigation$ = this.actions$.pipe(
    ofType(ROUTER_NAVIGATION),
    filter(() => this.breakpointsService.isMobile),
    map(() => new SidenavClose()),
  );

  constructor(private actions$: Actions,
              private breakpointsService: BreakpointsService) {
  }
}
