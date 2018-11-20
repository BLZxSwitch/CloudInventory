import { Injectable } from "@angular/core";
import { Actions, Effect, ofType } from "@ngrx/effects";
import { Observable } from "rxjs";
import { distinctUntilChanged, map, mergeMap } from "rxjs/operators";
import {
  HttpLoadingIndicatorActionsUnion,
  HttpLoadingIndicatorTypes,
} from "../../core/actions/htpp-loading-indicator.actions";
import { LoadingIndicatorHide, LoadingIndicatorShow } from "../actions/loading-indicator.actions";
import { LoadingIndicatorService } from "../services/loading-indicator.service";

@Injectable()
export class LoadingIndicatorEffects {

  @Effect()
  public effect$(): Observable<LoadingIndicatorShow | LoadingIndicatorHide> {
    return this.actions$.pipe(
      ofType<HttpLoadingIndicatorActionsUnion>(
        HttpLoadingIndicatorTypes.HttpStarted,
        HttpLoadingIndicatorTypes.HttpFinalized
      ),
      mergeMap(() => this.loadingIndicatorService.isLoading()),
      distinctUntilChanged(),
      map(isLoading =>
        isLoading ?
        new LoadingIndicatorShow() :
        new LoadingIndicatorHide()
      )
    );
  }

  constructor(
    private actions$: Actions,
    private loadingIndicatorService: LoadingIndicatorService) {
  }
}
