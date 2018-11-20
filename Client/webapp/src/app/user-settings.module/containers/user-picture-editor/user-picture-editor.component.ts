import { ChangeDetectionStrategy, Component, Input } from "@angular/core";
import { MatDialog } from "@angular/material";
import { Store } from "@ngrx/store";
import * as fromAuth from "../../../auth/reducers/index";
import { FileParameter } from "../../../core/services/service-proxies";
import { UserPictureDelete, UserPictureUpdate } from "../../actions/user-picture.actions";
import { InvalidUserPictureShowSnack } from "../../actions/user-settings-page.actions";
import { UserPictureCropperComponent } from "../../components/user-picture-cropper/user-picture-cropper.component";

@Component({
  selector: "pr-user-picture-editor",
  templateUrl: "./user-picture-editor.component.html",
  styleUrls: ["./user-picture-editor.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserPictureEditorComponent {

  @Input() public hasUserPicture: boolean;

  @Input() public userPicture: FileParameter;

  public editing: boolean;

  constructor(
    private store: Store<fromAuth.IState>,
    private dialog: MatDialog) {
  }

  public onUpload([file]) {
    this.isValidImage(file).then(isValid => {
      if (!isValid) {
        this.store.dispatch(new InvalidUserPictureShowSnack());
        return;
      }

      this.dialog.open(UserPictureCropperComponent, {
        autoFocus: false,
        data: {
          image: file
        }
      }).afterClosed()
        .subscribe(userPictureBlob => {
          if (userPictureBlob !== undefined) {
            this.store.dispatch(new UserPictureUpdate({
              userPicture: {
                fileName: "",
                data: userPictureBlob,
              }
            }));

            this.editing = false;
          }
        });
    });
  }

  public edit() {
    this.editing = true;
  }

  public delete() {
    this.store.dispatch(new UserPictureDelete());
  }

  private isValidImage(file: FileParameter) {
    return new Promise(resolve => {
      const img = new Image();

      img.onload = () => {
        resolve(img.width >= 100 && img.height >= 100);
      };

      img.src = URL.createObjectURL(file.data);
    });
  }
}
