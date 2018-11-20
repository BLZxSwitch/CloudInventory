import { Injectable } from "@angular/core";
import { MatSnackBar } from "@angular/material";
import {
  UpdateNotificationComponent
} from "../components/update-notification/update-notification.component";

@Injectable()
export class UpdateApplicationSnackBarService {

  constructor(private snackBar: MatSnackBar) {
  }

  public openNotification() {
    this.snackBar.openFromComponent(
      UpdateNotificationComponent, {
      duration: 0,
    });
  }
}
