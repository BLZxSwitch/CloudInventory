import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { select, Store} from "@ngrx/store";
import { Observable } from "rxjs";
import * as fromAuth from "../../../auth/reducers";
import { CaptchaServiceProxy } from "../../../core/services/service-proxies";
import { authFailedCountSelector } from "../../selectors/auth.failed-count.selector";

@Component({
  selector: "pr-captcha",
  template: `
    <pr-captcha-component
      *ngIf="siteKey !== undefined"
      [captchaGroup]="captchaGroup"
      [authFailed]="authFailed$ | async"
      [siteKey]="siteKey">
    </pr-captcha-component>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CaptchaContainerComponent {
  @Input()
  public captchaGroup: FormGroup;
  public authFailed$: Observable<number>;
  public siteKey: string;

  constructor(store: Store<fromAuth.IState>,
              private captchaServiceProxy: CaptchaServiceProxy,
              private cd: ChangeDetectorRef) {
    this.authFailed$ = store.pipe(select(authFailedCountSelector));
    this.captchaServiceProxy.get().subscribe(value => {
      this.siteKey = value;
      this.cd.detectChanges();
    });
  }
}
