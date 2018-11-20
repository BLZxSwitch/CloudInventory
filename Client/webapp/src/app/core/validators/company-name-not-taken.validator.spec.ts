import { AbstractControl } from "@angular/forms";
import { ValidationErrors } from "@angular/forms/src/directives/validators";
import { Mock } from "moq.ts";
import { Observable } from "rxjs";
import { of } from "rxjs/index";
import { createInjector, get, resolve } from "../../../unit-tests.components/mocks/createInjector";
import { subscribe } from "../../../unit-tests.components/subscribe";
import { CompanyNameTakenServiceProxy } from "../services/service-proxies";
import { CompanyNameNotTakenValidator } from "./company-name-not-taken.validator";

describe("company name not taken validator", () => {

  beforeEach(() => {
    createInjector(CompanyNameNotTakenValidator);
  });

  it("Should be resolved", () => {
    const actual = get<CompanyNameNotTakenValidator>();
    expect(actual).toEqual(jasmine.any(CompanyNameNotTakenValidator));
  });

  it("Returns null when company name is not taken", () => {
    const companyName = "company name";
    const control = new Mock<AbstractControl>()
      .setup(instance => instance.value)
      .returns(companyName)
      .object();

    resolve<CompanyNameTakenServiceProxy>(CompanyNameTakenServiceProxy)
      .setup(instance => instance.isTaken(companyName))
      .returns(of(false));

    const factory = get<CompanyNameNotTakenValidator>();
    const validatorFn = factory.create();
    const observable = validatorFn(control) as Observable<ValidationErrors | null>;

    const success = subscribe(observable).success;

    expect(success).toHaveBeenCalledWith(null);
  });

  it("Returns ValidationErrors when company name is taken", () => {
    const companyName = "company name";
    const control = new Mock<AbstractControl>()
      .setup(instance => instance.value)
      .returns(companyName)
      .object();

    resolve<CompanyNameTakenServiceProxy>(CompanyNameTakenServiceProxy)
      .setup(instance => instance.isTaken(companyName))
      .returns(of(true));

    const factory = get<CompanyNameNotTakenValidator>();
    const validatorFn = factory.create();
    const observable = validatorFn(control) as Observable<ValidationErrors | null>;

    const success = subscribe(observable).success;

    expect(success).toHaveBeenCalledWith({companyNameTaken: {companyName}});
  });

});
