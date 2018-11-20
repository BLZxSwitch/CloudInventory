import { TranslateService } from "@ngx-translate/core";
import { createInjector, get, resolve } from "../../../unit-tests.components/mocks/createInjector";
import { InputFeedbackPipe } from "./input-feedback.pipe";

describe("input feedback pipe", () => {

  beforeEach(() => {
    createInjector(InputFeedbackPipe);
  });

  it("Should be resolved", () => {
    const actual = get<InputFeedbackPipe>();
    expect(actual).toEqual(jasmine.any(InputFeedbackPipe));
  });

  it("Returns feedback for required validation", () => {
    const value = "VALUE";
    resolve<TranslateService>(TranslateService)
      .setup(instance => instance.instant("FORM.ERROR.REQUIRED"))
      .returns(value);

    const pipe = get<InputFeedbackPipe>();
    const actual = pipe.transform({required: {}});

    expect(actual).toBe(value);
  });

  it("Returns feedback for email validation", () => {
    const value = "VALUE";
    resolve<TranslateService>(TranslateService)
      .setup(instance => instance.instant("FORM.ERROR.EMAIL"))
      .returns(value);

    const pipe = get<InputFeedbackPipe>();
    const actual = pipe.transform({email: {}});

    expect(actual).toBe(value);
  });

  it("Returns feedback for email is taken validation", () => {
    const email = "m@m";
    const value = "VALUE";
    resolve<TranslateService>(TranslateService)
      .setup(instance => instance.instant("FORM.ERROR.EMAIL-IS-TAKEN"))
      .returns(value);

    const pipe = get<InputFeedbackPipe>();
    const actual = pipe.transform({emailTaken: {email}});

    expect(actual).toBe(value);
  });

  it("Returns feedback for company name is taken validation", () => {
    const companyName = "company name";
    const value = "VALUE";
    resolve<TranslateService>(TranslateService)
      .setup(instance => instance.instant("FORM.ERROR.COMPANY_NAME-IS-TAKEN"))
      .returns(value);

    const pipe = get<InputFeedbackPipe>();
    const actual = pipe.transform({companyNameTaken: {companyName}});

    expect(actual).toBe(value);
  });

  it("Returns feedback for confirm password validation", () => {
    const value = "VALUE";
    resolve<TranslateService>(TranslateService)
      .setup(instance => instance.instant("FORM.ERROR.CONFIRM_PASSWORD"))
      .returns(value);

    const pipe = get<InputFeedbackPipe>();
    const actual = pipe.transform({confirmPassword: {}});

    expect(actual).toBe(value);
  });
});
