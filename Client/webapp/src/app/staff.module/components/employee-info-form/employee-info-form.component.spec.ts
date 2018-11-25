import { FormBuilder } from "@angular/forms";
import { utc } from "moment";
import * as moment from "moment";
import { of } from "rxjs";
import { createInjector, get, resolve } from "../../../../unit-tests.components/mocks/createInjector";
import { EmployeeDTO, Gender } from "../../../core/services/service-proxies";
import { EmailNotTakenValidator } from "../../../core/validators/email-not-taken.validator";
import { IEmployeeInfoForm } from "../../models/employee-info-form.model";
import { EmployeeInfoFormComponent } from "./employee-info-form.component";

describe("EmployeeInfoFormComponent", () => {

  beforeEach(() => {
    createInjector(EmployeeInfoFormComponent, [{provide: FormBuilder, useClass: FormBuilder, deps: []}]);
  });

  it("should not change fields not used in form", () => {

    resolve<EmailNotTakenValidator>(EmailNotTakenValidator)
      .setup(instance => instance.create())
      .returns(() => of(null));

    const component = get<EmployeeInfoFormComponent>();

    const employee: EmployeeDTO = {
      id: "1",
      gender: Gender.Male,
      dateOfBirth: utc().valueOf(),
      firstName: "John",
      lastName: "Doe",
      patronymicName: "Fatherovich",
      phone: "mobile number format is not validated",
      email: "personal@email.com",
      fullName: "John Doe Fatherovich",
      isAdmin: false,
      isInvited: false,
      isActive: true,
      isInvitationAccepted: false,
    } as EmployeeDTO;

    component.employee = {...employee} as EmployeeDTO;

    component.form.patchValue({
      firstName: "Sam",
    });

    component.submitForm.subscribe(value => {
      const expected = {
        ...employee,
        firstName: "Sam",
      };

      expect({
        ...value,
        dateOfBirth: moment(value.dateOfBirth).format()
      }).toEqual({
        ...expected,
        dateOfBirth: moment(expected.dateOfBirth).format()
      });
    });

    component.onSubmit();
  });

  describe("form", () => {

    let employeeInfoForm: IEmployeeInfoForm;

    beforeEach(() => {
      employeeInfoForm = {
        gender: Gender.Male,
        dateOfBirth: utc().valueOf(),
        firstName: "John",
        lastName: "Doe",
        patronymicName: "Fatherovich",
        phone: "mobile number format is not validated",
        email: "personal@email.com",
        isAdmin: false,
        isActive: true
      };

      resolve<EmailNotTakenValidator>(EmailNotTakenValidator)
        .setup(instance => instance.create())
        .returns(() => of(null));
    });

    it("should be valid when data is valid", () => {
      const component = get<EmployeeInfoFormComponent>();

      component.form.patchValue(employeeInfoForm);

      expect(component.form.valid).toBeTruthy();
    });

    it("should be invalid when gender is undefined", () => {
      const component = get<EmployeeInfoFormComponent>();

      employeeInfoForm.gender = undefined;

      component.form.patchValue(employeeInfoForm);

      expect(component.form.valid).toBeFalsy();
    });

    it("should be invalid when gender is undefined", () => {
      const component = get<EmployeeInfoFormComponent>();

      employeeInfoForm.dateOfBirth = undefined;

      component.form.patchValue(employeeInfoForm);

      expect(component.form.valid).toBeFalsy();
    });

    it("should be invalid when firstName is undefined", () => {
      const component = get<EmployeeInfoFormComponent>();

      employeeInfoForm.firstName = undefined;

      component.form.patchValue(employeeInfoForm);

      expect(component.form.valid).toBeFalsy();
    });

    it("should be invalid when lastName is undefined", () => {
      const component = get<EmployeeInfoFormComponent>();

      employeeInfoForm.lastName = undefined;

      component.form.patchValue(employeeInfoForm);

      expect(component.form.valid).toBeFalsy();
    });

    it("should be valid when phone is undefined", () => {
      const component = get<EmployeeInfoFormComponent>();

      employeeInfoForm.phone = undefined;

      component.form.patchValue(employeeInfoForm);

      expect(component.form.valid).toBeTruthy();
    });

    it("should be invalid when email is undefined", () => {
      const component = get<EmployeeInfoFormComponent>();

      employeeInfoForm.email = undefined;

      component.form.patchValue(employeeInfoForm);

      expect(component.form.valid).toBeFalsy();
    });

    it("should be invalid when email is set but invalid", () => {
      const component = get<EmployeeInfoFormComponent>();

      employeeInfoForm.email = "invalid@email";

      component.form.patchValue(employeeInfoForm);

      expect(component.form.valid).toBeFalsy();
    });

    it("should be invalid when email is taken", () => {

      resolve<EmailNotTakenValidator>(EmailNotTakenValidator)
        .setup(instance => instance.create(undefined))
        .returns(() => of({emailTaken: true}));

      const component = get<EmployeeInfoFormComponent>();
      component.ngOnInit();
      component.form.patchValue(employeeInfoForm);

      expect(component.form.valid).toBeFalsy();
    });
  });
});
