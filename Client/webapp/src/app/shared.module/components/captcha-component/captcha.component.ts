import { ChangeDetectionStrategy, Component, Input, ViewChild } from "@angular/core";
import { FormGroup, NG_VALUE_ACCESSOR } from "@angular/forms";
import { TranslateService } from "@ngx-translate/core";
import { InvisibleReCaptchaComponent, ReCaptcha2Component } from "ngx-captcha";

@Component({
  selector: "pr-captcha-component",
  templateUrl: "./captcha.component.html",
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: CaptchaComponent,
    multi: true,
  }],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CaptchaComponent {

  public isCaptchaVisible = false;

  @Input()
  public captchaGroup: FormGroup;

  public _authFailed: number;
  @Input()
  public get authFailed(): number {
    return this._authFailed;
  }
  public set authFailed(value: number) {
    this._authFailed = value;
    this.reloadInvisibleCaptcha();
    this.updateCaptchaVisibility();
  }

  @ViewChild("captchaElem")
  public captchaElem: ReCaptcha2Component;

  @ViewChild("invisibleCaptchaElem")
  public invisibleCaptchaElem: InvisibleReCaptchaComponent;

  public _siteKey: string;
  @Input()
  public get siteKey() {
    return this._siteKey;
  }
  public set siteKey(value: string) {
    this._siteKey = value;
  }

  public lang: string;

  constructor(translate: TranslateService) {
    this.lang = translate.currentLang;
  }

  public handleLoad(): void {
    this.updateInvisibleCaptcha();
  }

  public handleExpire(): void {
    this.reload();
  }

  private reloadInvisibleCaptcha() {
    if (this.authFailed < 2 && !this.isCaptchaVisible && !!this.invisibleCaptchaElem) {
      this.invisibleCaptchaElem.reloadCaptcha();
    }
  }

  private updateInvisibleCaptcha() {
    setTimeout(() => {
      try {
        this.invisibleCaptchaElem.execute();
      } catch {
        this.isCaptchaVisible = true;
      }
    });
  }

  private updateCaptchaVisibility() {
    if (this.authFailed > 1 && this.isCaptchaVisible && !!this.captchaElem) {
      this.reload();
    } else if (this.authFailed > 1) {
      this.isCaptchaVisible = true;
    }
  }

  private reload(): void {
    this.captchaElem.reloadCaptcha();
  }
}
