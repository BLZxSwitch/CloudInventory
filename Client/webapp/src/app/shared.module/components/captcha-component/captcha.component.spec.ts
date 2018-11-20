import { Mock } from "moq.ts";
import { InvisibleReCaptchaComponent, ReCaptcha2Component } from "ngx-captcha";
import { createInjector, get } from "../../../../unit-tests.components/mocks/createInjector";
import { CaptchaComponent } from "./captcha.component";

describe("Captcha component", () => {

  beforeEach(() => {
    createInjector(CaptchaComponent);
  });

  it("Should be resolved", () => {
    const actual = get<CaptchaComponent>();
    expect(actual).toEqual(jasmine.any(CaptchaComponent));
  });

  it("Exposes invisible captcha by default", () => {
    const component = get<CaptchaComponent>();
    const actual = component.isCaptchaVisible;

    expect(actual).toBe(false);
  });

  it("Exposes visible captcha when auth failed twice", () => {
    const component = get<CaptchaComponent>();
    component.authFailed = 2;
    const actual = component.isCaptchaVisible;

    expect(actual).toBe(true);
  });

  it("Executes invisible captcha by default", done => {

    const invisibleReCaptchaComponent = new Mock<InvisibleReCaptchaComponent>()
      .setup(instance => instance.execute())
      .callback(() => {
        done();
      })
      .object();

    const component = get<CaptchaComponent>();
    component.invisibleCaptchaElem = invisibleReCaptchaComponent;
    component.handleLoad();
  });

  it("Reloads visible captcha when it expired", done => {

    const reCaptcha2Component = new Mock<ReCaptcha2Component>()
      .setup(instance => instance.reloadCaptcha())
      .callback(() => {
        done();
      })
      .object();

    const component = get<CaptchaComponent>();
    component.captchaElem = reCaptcha2Component;

    component.handleExpire();
  });

  it("Reloads invisible captcha when auth failed", done => {

    const invisibleReCaptchaComponent = new Mock<InvisibleReCaptchaComponent>()
      .setup(instance => instance.reloadCaptcha())
      .callback(() => {
        done();
      })
      .object();

    const component = get<CaptchaComponent>();
    component.invisibleCaptchaElem = invisibleReCaptchaComponent;
    component.authFailed = 1;
  });
});
