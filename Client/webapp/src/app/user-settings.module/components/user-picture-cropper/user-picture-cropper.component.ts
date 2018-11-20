import { AfterViewInit, Component, ElementRef, Inject, ViewChild } from "@angular/core";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material";
import { DomSanitizer, SafeUrl } from "@angular/platform-browser";
import * as cropImage from "crop-image";
import Cropper from "cropperjs";

@Component({
  selector: "pr-user-picture-cropper",
  templateUrl: "./user-picture-cropper.component.html",
  styleUrls: ["./user-picture-cropper.component.scss"]
})
export class UserPictureCropperComponent implements AfterViewInit {

  @ViewChild("img") public img: ElementRef;

  public result: any;

  public src: SafeUrl;

  private croppr: Cropper;

  constructor(@Inject(MAT_DIALOG_DATA) private data: any,
              private dialogRef: MatDialogRef<UserPictureCropperComponent>,
              private sanitizer: DomSanitizer) {
    this.src = this.sanitizer.bypassSecurityTrustUrl(URL.createObjectURL(this.data.image.data));
  }

  public ngAfterViewInit() {
    this.croppr = new Cropper(this.img.nativeElement, {
      aspectRatio: 1,
      minCropBoxHeight: 100,
      minCropBoxWidth: 100,
      zoomable: false,
      background: false,
      viewMode: 3,
      scalable: false,
      movable: false,
      rotatable: false,
    });
  }

  public onDone() {
    const {x, y, width, height} = this.croppr.getData();

    const croppedImage = cropImage(this.img.nativeElement, x, y, width, height, 100, 100);

    this.dialogRef.close(croppedImage);
  }

  public onCancel() {
    this.dialogRef.close();
  }
}
