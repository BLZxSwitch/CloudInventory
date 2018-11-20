import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";
import { EmployeeDTO, Gender } from "../../../core/services/service-proxies";
import { EmailNotTakenValidator } from "../../../core/validators/email-not-taken.validator";
import { BasicFormComponent } from "../../../shared.module/base-components/basic-form-component";
import { PrValidators } from "../../../shared.module/validators/pr-validators";
import { now } from "../../../shared/date/now";
import { ControlsConfig } from "../../../shared/form/controls-config";
import { IEmployeeInfoForm } from "../../models/employee-info-form.model";

@Component({
  selector: "pr-employee-info-form",
  templateUrl: "./employee-info-form.component.html",
  styleUrls: ["./employee-info-form.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EmployeeInfoFormComponent extends BasicFormComponent implements OnInit {

  get employee(): EmployeeDTO {
    return this._employee;
  }

  @Input() set employee(value: EmployeeDTO) {
    this._employee = value;
    const model = this.getFormFromDto(value);
    if (model) {
      this.form.patchValue(model);
    }
    const emailControl = this.form.get("email");
    if (this._employee) {
      emailControl.disable();
    } else {
      emailControl.enable();
    }
  }

  @Input() public type: string;

  @Output() public cancel = new EventEmitter<undefined>();

  @Output() public sendInvitation = new EventEmitter<EmployeeDTO>();

  @Output() public setInvitationFlag = new EventEmitter<boolean>();

  public ahvMask = [/\d/, /\d/, /\d/, "\.", /\d/, /\d/, /\d/, /\d/, "\.", /\d/, /\d/, /\d/, /\d/, ".", /\d/, /\d/];

  public maxDateOfBirth = now();

  private _employee: EmployeeDTO;

  constructor(private formBuilder: FormBuilder,
              private emailNotTakenValidator: EmailNotTakenValidator) {
    super();
    this.createForm();

    this.transformFormData = data => this.getDtoFromForm(data);
  }

  public onCancel() {
    this.cancel.emit();
  }

  public onSendInvitation(employee) {
    this.sendInvitation.emit(employee);
  }

  public onSetInvitationFlag(invitationFlag) {
    this.setInvitationFlag.emit(invitationFlag);
    this.onSubmit();
  }

  public ngOnInit() {
    this.setAsyncValidators();
  }

  private setAsyncValidators() {
    const emailNotTakenValidator = this.emailNotTakenValidator.create(this.employee && this.employee.id);

    this.form.get("email").setAsyncValidators(emailNotTakenValidator);
  }

  private createForm(): void {
    const controlsConfig: ControlsConfig<IEmployeeInfoForm> = {
      gender: ["", [Validators.required]],
      dateOfBirth: [null, [Validators.required]],
      firstName: ["", [Validators.required]],
      lastName: ["", [Validators.required]],
      patronymicName: ["", [Validators.required]],
      phone: [""],
      email: ["", [Validators.required, PrValidators.email]],
      isAdmin: [false],
      isActive: [true],
    };

    this.form = this.formBuilder.group(controlsConfig);
  }

  private getFormFromDto(value: EmployeeDTO): IEmployeeInfoForm {
    if (!value) return undefined;

    return {
      gender: value.gender,
      dateOfBirth: value.dateOfBirth,
      firstName: value.firstName,
      lastName: value.lastName,
      patronymicName: value.patronymicName,
      phone: value.phone,
      email: value.email,
      isAdmin: value.isAdmin,
      isActive: value.isActive,
    };
  }

  private getDtoFromForm(formValue: IEmployeeInfoForm): EmployeeDTO {
    if (!formValue) return undefined;

    return EmployeeDTO.fromJS({
      ...this.employee,
      gender: formValue.gender,
      dateOfBirth: formValue.dateOfBirth,
      firstName: formValue.firstName,
      lastName: formValue.lastName,
      patronymicName: formValue.patronymicName,
      phone: formValue.phone,
      email: formValue.email,
      isAdmin: formValue.isAdmin,
      isActive: formValue.isActive,
    });
  }
}
