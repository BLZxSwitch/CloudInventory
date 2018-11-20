import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from "@angular/core";
import { EmployeeDTO, Gender } from "../../../core/services/service-proxies";

@Component({
  selector: "pr-employee-list-item",
  templateUrl: "./employee-list-item.component.html",
  styleUrls: ["./employee-list-item.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EmployeeListItemComponent {

  @Input() public employee: EmployeeDTO;

  @Input() public showDelete: boolean;

  @Output() public edit = new EventEmitter();

  @Output() public delete = new EventEmitter();

  @Output() public sendInvitation = new EventEmitter<EmployeeDTO>();

  public showMore = false;

  public get genderTranslationKey() {
    const gender = Gender[this.employee.gender] || "";

    return this.employee && `COMMON.GENDER.${gender.toUpperCase()}`;
  }

  public onShowMoreToggle() {
    this.showMore = !this.showMore;
  }

  public onEditClick() {
    this.edit.emit();
  }

  public onDeleteClick() {
    this.delete.emit();
  }

  public onSendInvitation() {
    this.sendInvitation.emit(this.employee);
  }
}
