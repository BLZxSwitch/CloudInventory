import { ChangeDetectorRef, Component, Input, OnDestroy } from "@angular/core";
import { Actions, ofType } from "@ngrx/effects";
import { of, Subject } from "rxjs/index";
import { catchError, takeUntil } from "rxjs/operators";
import { FileResponse, UserPictureServiceProxy } from "../../../core/services/service-proxies";
import { UserPictureActionTypes } from "../../../user-settings.module/actions/user-picture.actions";

@Component({
  selector: "pr-user-picture",
  templateUrl: "./user-picture.component.html",
  styleUrls: ["./user-picture.component.scss"]
})
export class UserPictureComponent implements OnDestroy {

  @Input()
  public set employeeId(employeeId: string) {
    if (!employeeId) return;

    this.userPictureServiceProxy.getUserPictureByEmployeeId(employeeId)
      .pipe(catchError(() => of(null)))
      .subscribe(userPicture => {
        this.userPicture = userPicture;
        this.changeDetector.markForCheck();
      });
  }

  @Input()
  public set currentUser(value: boolean) {
    if (!value) return;

    this.reloadCurrentUserPicture();
  }

  public userPicture: FileResponse;

  private ngUnsubscribe$ = new Subject();

  constructor(private actions$: Actions,
              private changeDetector: ChangeDetectorRef,
              private userPictureServiceProxy: UserPictureServiceProxy) {
    this.actions$.pipe(
      ofType(UserPictureActionTypes.UserPictureUpdateSuccess, UserPictureActionTypes.UserPictureDeleteSuccess),
      takeUntil(this.ngUnsubscribe$),
    ).subscribe(() => {
      this.reloadCurrentUserPicture();
    });
  }

  public ngOnDestroy() {
    this.ngUnsubscribe$.next();
    this.ngUnsubscribe$.complete();
  }

  private reloadCurrentUserPicture() {
    this.userPictureServiceProxy.getUserPicture()
      .pipe(catchError(() => of(null)))
      .subscribe(userPicture => {
        this.userPicture = userPicture;
        this.changeDetector.markForCheck();
      });
  }
}
