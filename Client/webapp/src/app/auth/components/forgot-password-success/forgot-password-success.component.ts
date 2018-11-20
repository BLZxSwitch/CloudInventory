import { ChangeDetectionStrategy, Component } from "@angular/core";
import { RoutesService } from "../../../core/services/routes.service";

@Component({
  selector: "pr-forgot-password-success",
  templateUrl: "./forgot-password-success.component.html",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ForgotPasswordSuccessComponent {

  public get authLoginUrl() {
    return this.routesService.authLogin();
  }

  constructor(private routesService: RoutesService) {
  }
}
