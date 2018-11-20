import { ComponentType } from "@angular/cdk/portal";
import { Injectable, TemplateRef } from "@angular/core";
import { MatDialog, MatDialogConfig, MatSnackBar } from "@angular/material";
import { Actions, ofType } from "@ngrx/effects";
import { Store } from "@ngrx/store";
import { Action } from "@ngrx/store/src/models";
import { TranslateService } from "@ngx-translate/core";
import { merge } from "rxjs/index";
import { exhaustMap, filter, first, map, switchMap, tap } from "rxjs/operators";
import { DescriptionProvider } from "../../core/services/description.provider/description.provider";
import { TranslatableService } from "../../core/services/translate/translatable.service";
import { WindowProvider } from "../../core/services/window-provider.provider";

@Injectable()
export class EffectUtilsService {

  constructor(private actions$: Actions,
              private store: Store<any>,
              private snackBar: MatSnackBar,
              private dialog: MatDialog,
              private window: WindowProvider,
              private descriptionProvider: DescriptionProvider,
              private translatableService: TranslatableService,
              private translate: TranslateService) {
  }

  public createSuccessSnackEffect(initialAction: any,
                                  messageTranslationKey: ((payload: any) => string) | string,
                                  duration = 2000) {
    return this.actions$.pipe(
      ofType(initialAction),
      map(action => (action as any).payload),
      map(payload => typeof messageTranslationKey === "function" ? messageTranslationKey(payload) : messageTranslationKey),
      switchMap(actualMessageTranslationKey => this.translate.get(actualMessageTranslationKey)),
      tap(message => {
        this.snackBar.open(message, undefined, {
          duration
        });
      })
    );
  }

  public createErrorSnackEffectByTranslationKey(initialAction: any,
                                                messageTranslationKey: ((payload: any) => string) | string,
                                                duration = 4000) {
    return this.actions$.pipe(
      ofType(initialAction),
      map(action => (action as any).payload),
      map(payload => typeof messageTranslationKey === "function" ? messageTranslationKey(payload) : messageTranslationKey),
      switchMap(actualMessageTranslationKey => this.translate.get(actualMessageTranslationKey)),
      tap(message => {
        this.snackBar.open(message, undefined, {
          duration
        });
      })
    );
  }

  public createErrorSnackEffect(initialAction: any,
                                duration = 4000) {
    return this.actions$.pipe(
      ofType(initialAction),
      map(action => (action as any).payload),
      map(payload => this.descriptionProvider.get(payload)),
      switchMap(actualMessageTranslationKey => this.translatableService.get(actualMessageTranslationKey)),
      tap(message => {
        this.snackBar.open(message, undefined, {
          duration
        });
      })
    );
  }

  public createOpenDialogEffect(dialogOpenAction: string[],
                                successAction: string[],
                                componentOrTemplateRef: ComponentType<any> | TemplateRef<any>,
                                dialogClosedActionToDispatch: new () => Action,
                                cancelActionToDispatch?: new () => Action,
                                config?: MatDialogConfig<any>) {
    return this.actions$.pipe(
      ofType(...dialogOpenAction),
      exhaustMap(() => {
        const dialogRef = this.dialog.open(componentOrTemplateRef, {
          ...config,
          autoFocus: false
        });
        return merge(
          this.actions$.pipe(
            ofType(...successAction),
            tap(() => dialogRef.close())
          ),
          dialogRef.afterClosed().pipe(
            tap(() => {
              if (cancelActionToDispatch) {
                this.store.dispatch(new cancelActionToDispatch());
              }
            })
          )
        ).pipe(
          map(() => new dialogClosedActionToDispatch()),
          first(),
        );
      })
    );
  }

  public createConfirmDialogEffect<T>(dialogOpenAction: any,
                                      messageTranslationKey: ((payload: T) => (string | [string, object])) | string | [string, object],
                                      dialogConfirmActionToDispatch: new (T) => any) {
    return this.actions$.pipe(
      ofType(dialogOpenAction),
      map<{ payload: T }, T>(value => value.payload),
      filter(payload => {
        const [actualMessageTranslationKey, interpolateParams] = this.getTranslation(messageTranslationKey, payload);
        return this.window.confirm(this.translate.instant(actualMessageTranslationKey, interpolateParams));
      }),
      map(payload => new dialogConfirmActionToDispatch(payload))
    );
  }

  private getTranslation<T>(messageTranslationKey: ((payload: T) => (string | [string, object])) | string | [string, object], payload: T) {
    const actualMessageTranslationKey = typeof messageTranslationKey === "function"
      ? messageTranslationKey(payload)
      : messageTranslationKey;

    return typeof actualMessageTranslationKey === "string"
      ? [actualMessageTranslationKey, undefined] as [string, object]
      : actualMessageTranslationKey;
  }
}
