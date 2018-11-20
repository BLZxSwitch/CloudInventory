import { ChangeDetectionStrategy, Component, ElementRef, EventEmitter, Input, Output, ViewChild } from "@angular/core";
import { FileSystemFileEntry, UploadEvent } from "ngx-file-drop";
import { FileParameter } from "../../../core/services/service-proxies";

@Component({
  selector: "pr-file-input",
  templateUrl: "./file-input.component.html",
  styleUrls: ["./file-input.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FileInputComponent {

  @Input() public accept: string;

  @Input() public message: string;

  @Input() public pending: boolean;

  @Input() public multiple = true;

  @Input() public canUpload: () => boolean;

  @Output() public upload = new EventEmitter<FileParameter[]>();

  @ViewChild("fileInput") public fileInput: ElementRef;

  @ViewChild("mobileButton", {read: ElementRef}) public mobileButton: ElementRef;

  public onFileDrop(event: UploadEvent) {
    if (!this.canUploadInternal()) return;

    const filesPromises = event.files
      .map(({fileEntry}) => fileEntry)
      .filter(({isFile}) => isFile)
      .map(fileEntry => fileEntry as FileSystemFileEntry)
      .map(fileEntry => new Promise(resolve => {
        fileEntry.file(file => resolve(file));
      }));

    Promise
      .all(filesPromises)
      .then(files => {
        const validFiles = files.filter(file => this.isValidFile(file, this.accept));
        if (validFiles.length === 0) return;

        this.emitFiles(this.multiple ? validFiles : [validFiles[0]]);
      });
  }

  public onAddClick() {
    if (this.canUploadInternal()) {
      this.fileInput.nativeElement.click();
    }
  }

  public onFileInputChange(event) {
    const files = [];
    for (const file of event.target.files) {
      files.push(file);
    }
    this.emitFiles(files);
    this.fileInput.nativeElement.value = "";
  }

  public isValidFileSize(files) {
    // files.map(file => file.size < 10);
    files.map(file => console.log(file.size));
  }

  public onMobileButtonLabelClick() {
    this.mobileButton.nativeElement.click();
  }

  private canUploadInternal() {
    return this.canUpload ? this.canUpload() : true;
  }

  private emitFiles(files) {
    this.isValidFileSize(files);
    const fileParameters = files.map(file => ({
      data: file,
      fileName: file.name,
    } as FileParameter));

    this.upload.emit(fileParameters);
  }

  // from https://gitlab.com/meno/dropzone/blob/master/src/dropzone.js
  private isValidFile(file, acceptedFiles) {
    if (!acceptedFiles) {
      return true;
    }
    // If there are no accepted mime types, it's OK
    acceptedFiles = acceptedFiles.split(",");

    const mimeType = file.type;
    const baseMimeType = mimeType.replace(/\/.*$/, "");

    for (let validType of acceptedFiles) {
      validType = validType.trim();
      if (validType.charAt(0) === ".") {
        if (file.name.toLowerCase().indexOf(validType.toLowerCase(), file.name.length - validType.length) !== -1) {
          return true;
        }
      } else if (/\/\*$/.test(validType)) {
        // This is something like a image/* mime type
        if (baseMimeType === validType.replace(/\/.*$/, "")) {
          return true;
        }
      } else {
        if (mimeType === validType) {
          return true;
        }
      }
    }

    return false;
  }
}
