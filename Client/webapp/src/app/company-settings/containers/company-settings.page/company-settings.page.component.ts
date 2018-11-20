import { ChangeDetectionStrategy, Component } from "@angular/core";
import { select, Store } from "@ngrx/store";
import { CompanySettingsEditRequest, CompanySettingsLoad } from "../../actions/company-settings.actions";
import * as fromCompanySettings from "../../reducers/index";

@Component({
  selector: "pr-company-settings-page",
  styleUrls: ["./company-settings.page.component.scss"],
  templateUrl: "./company-settings.page.component.html",
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CompanySettingsPageComponent {

  public tenantSettings$ = this.store.pipe(select(fromCompanySettings.getTenantSettings));

  constructor(private store: Store<fromCompanySettings.IState>) {
    this.store.dispatch(new CompanySettingsLoad());
  }

  public onSubmit(tenantSettings) {
    this.store.dispatch(new CompanySettingsEditRequest({tenantSettings}));
  }
}
