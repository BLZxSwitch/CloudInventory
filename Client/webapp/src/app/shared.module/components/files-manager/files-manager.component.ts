import { ChangeDetectionStrategy, Component, ContentChild, EventEmitter, Input, Output, TemplateRef } from "@angular/core";

@Component({
  selector: "pr-files-manager",
  templateUrl: "./files-manager.component.html",
  styleUrls: ["./files-manager.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FilesManagerComponent {

  @Input() public accept: string;

  @Input() public pending: boolean;

  @Input() public files: any[];

  @Input() public vertical: boolean;

  @Output() public upload = new EventEmitter<File>();

  @Output() public delete = new EventEmitter<string>();

  @ContentChild(TemplateRef) public fileTemplate: TemplateRef<any>;

  public onUpload(files) {
    this.upload.emit(files);
  }

  public onDelete(file) {
    this.delete.emit(file);
  }

  public trackByFn(index) {
    return index;
  }
}
