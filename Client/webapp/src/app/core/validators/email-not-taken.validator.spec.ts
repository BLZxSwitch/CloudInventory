import { AbstractControl } from "@angular/forms";
import { ValidationErrors } from "@angular/forms/src/directives/validators";
import { Mock } from "moq.ts";
import { Observable } from "rxjs";
import { of } from "rxjs/index";
import { createInjector, get, resolve } from "../../../unit-tests.components/mocks/createInjector";
import { subscribe } from "../../../unit-tests.components/subscribe";
import { EmailTakenServiceProxy } from "../services/service-proxies";
import { EmailNotTakenValidator } from "./email-not-taken.validator";

describe("email not taken validator", () => {

  beforeEach(() => {
    createInjector(EmailNotTakenValidator);
  });

  it("Should be resolved", () => {
    const actual = get<EmailNotTakenValidator>();
    expect(actual).toEqual(jasmine.any(EmailNotTakenValidator));
  });

  it("Returns null when email is not taken", () => {
    const email = "m@m";
    const selfEmployeeId = "selfEmployeeId";
    const control = new Mock<AbstractControl>()
      .setup(instance => instance.value)
      .returns(email)
      .object();

    resolve<EmailTakenServiceProxy>(EmailTakenServiceProxy)
      .setup(instance => instance.isTaken(email, selfEmployeeId))
      .returns(of(false));

    const factory = get<EmailNotTakenValidator>();
    const validatorFn = factory.create(selfEmployeeId);
    const observable = validatorFn(control) as Observable<ValidationErrors | null>;

    const success = subscribe(observable).success;

    expect(success).toHaveBeenCalledWith(null);
  });

  it("Returns ValidationErrors when email is taken", () => {
    const email = "m@m";
    const selfEmployeeId = "selfEmployeeId";
    const control = new Mock<AbstractControl>()
      .setup(instance => instance.value)
      .returns(email)
      .object();

    resolve<EmailTakenServiceProxy>(EmailTakenServiceProxy)
      .setup(instance => instance.isTaken(email, selfEmployeeId))
      .returns(of(true));

    const factory = get<EmailNotTakenValidator>();
    const validatorFn = factory.create(selfEmployeeId);
    const observable = validatorFn(control) as Observable<ValidationErrors | null>;

    const success = subscribe(observable).success;

    expect(success).toHaveBeenCalledWith({emailTaken: {email}});
  });

});
