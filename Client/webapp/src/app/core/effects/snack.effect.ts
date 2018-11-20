import { Injectable } from "@angular/core";
import { MatSnackBar } from "@angular/material";
import { Actions, Effect, ofType } from "@ngrx/effects";
import { Observable, of } from "rxjs/index";
import { switchMap, tap } from "rxjs/operators";
import { DescriptionProvider } from "../services/description.provider/description.provider";
import { TranslatableService } from "../services/translate/translatable.service";

@Injectable()
export class SnackEffect {

  @Effect({dispatch: false})
  public effect$(): Observable<any> {
    return this.actions$.pipe(
      ofType(...[]),
      switchMap(action => {
        const translatable = this.descriptionProvider.get(action) || this.descriptionProvider.get((action as any).payload);
        if (translatable === undefined) {
          return of(action);
        }
        return this.translatableService.get(translatable);
      }),
      tap(message => {
        this.snackBar.open(message, undefined, {duration: 4000});
      })
    );
  }

  constructor(private actions$: Actions,
              private snackBar: MatSnackBar,
              private descriptionProvider: DescriptionProvider,
              private translatableService: TranslatableService) {

  }
}
