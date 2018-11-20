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

  const validAHV = "756.9217.0769.85";
  const invalidAHV = "756.9217.0769.86";

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
      addressLine1: "addressLine",
      phone: "mobile number format is not validated",
      email: "personal@email.com",
      ahvNr: validAHV,
      number: "1",
      city: "city",
      addressLine2: "",
      fullName: "John Doe",
      zip: "111",
      hometown: "hometown",
      nationality: "nationality",
      notes: "notes",
      isAdmin: false,
      isInvited: false,
      isActive: true,
      isInvitationAccepted: false,
      organizationalUnitId: "organizationalUnitId",
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
        number: "number",
        gender: Gender.Male,
        dateOfBirth: utc().valueOf(),
        firstName: "John",
        lastName: "Doe",
        addressLine: "addressLine",
        city: "city",
        zip: "zip",
        phone: "mobile number format is not validated",
        email: "personal@email.com",
        ahvNr: validAHV,
        hometown: "hometown",
        nationality: "nationality",
        notes: "notes",
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

    it("should be valid when city is undefined", () => {
      const component = get<EmployeeInfoFormComponent>();

      employeeInfoForm.city = undefined;

      component.form.patchValue(employeeInfoForm);

      expect(component.form.valid).toBeTruthy();
    });

    it("should be valid when zip is undefined", () => {
      const component = get<EmployeeInfoFormComponent>();

      employeeInfoForm.zip = undefined;

      component.form.patchValue(employeeInfoForm);

      expect(component.form.valid).toBeTruthy();
    });

    it("should be valid when addressLine is undefined", () => {
      const component = get<EmployeeInfoFormComponent>();

      employeeInfoForm.addressLine = undefined;

      component.form.patchValue(employeeInfoForm);

      expect(component.form.valid).toBeTruthy();
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

    it("should be invalid when ahvNr is undefined", () => {
      const component = get<EmployeeInfoFormComponent>();

      employeeInfoForm.ahvNr = undefined;

      component.form.patchValue(employeeInfoForm);

      expect(component.form.valid).toBeFalsy();
    });

    it("should be invalid when ahvNr is set but invalid", () => {
      const component = get<EmployeeInfoFormComponent>();

      employeeInfoForm.ahvNr = invalidAHV;

      component.form.patchValue(employeeInfoForm);

      expect(component.form.valid).toBeFalsy();
    });

    it("should be invalid when number is undefined", () => {
      const component = get<EmployeeInfoFormComponent>();

      employeeInfoForm.number = undefined;

      component.form.patchValue(employeeInfoForm);

      expect(component.form.valid).toBeFalsy();
    });

    it("should be valid when nationality is undefined", () => {
      const component = get<EmployeeInfoFormComponent>();

      employeeInfoForm.nationality = undefined;

      component.form.patchValue(employeeInfoForm);

      expect(component.form.valid).toBeTruthy();
    });

    it("should be valid when hometown is undefined", () => {
      const component = get<EmployeeInfoFormComponent>();

      employeeInfoForm.hometown = undefined;

      component.form.patchValue(employeeInfoForm);

      expect(component.form.valid).toBeTruthy();
    });
  });
});
