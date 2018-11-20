import { NgModule } from "@angular/core";
import { MatStepperModule } from "@angular/material";
import { EffectsModule } from "@ngrx/effects";
import { ActionReducerMap, StoreModule } from "@ngrx/store";
import { TranslateModule } from "@ngx-translate/core";
import { LayoutModule } from "../layout/layout.module";
import { SharedModule } from "../shared.module/shared.module";
import { CompanyRegisterRoutingModule } from "./company-register.routing.module";
import { CompanyRegisterFormComponent } from "./components/company-register.form.component/company-register.form.component";
import { CompanyRegisterComponent } from "./containers/company-register.component/company-register.component";
import { CompanyRegisterEffect } from "./effects/company-register.effect";
import { companyRegisterReducer } from "./reducers/company-register.reducer";
import { CompanyRegisterErrorStateProvider } from "./services/company-register.error-state.provider";
import { CompanyRegisterPendingSateProvider } from "./services/company-register.pending-sate.provider";
import { CompanyRegisterService } from "./services/company-register.service";
import { ICompanyRegisterRootState } from "./store/company-register.root.state";

const featureReducers = {companyRegister: companyRegisterReducer} as ActionReducerMap<ICompanyRegisterRootState>;

@NgModule({
  declarations: [
    CompanyRegisterComponent,
    CompanyRegisterFormComponent
  ],
  imports: [
    MatStepperModule,
    CompanyRegisterRoutingModule,
    TranslateModule.forChild(),
    SharedModule,
    LayoutModule,
    StoreModule.forFeature("companyRegister", featureReducers),
    EffectsModule.forFeature([CompanyRegisterEffect])
  ],
  providers: [
    CompanyRegisterErrorStateProvider,
    CompanyRegisterPendingSateProvider,
    CompanyRegisterService
  ]
})
export class CompanyRegisterModule {
}
