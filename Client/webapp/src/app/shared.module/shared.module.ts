import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { TranslateModule } from "@ngx-translate/core";
import { TextMaskModule } from "angular2-text-mask";
import { NgxCaptchaModule } from "ngx-captcha";
import { FileDropModule } from "ngx-file-drop";
import { MomentModule } from "ngx-moment";
import { MaterialModule } from "../material.module/material.module";
import { ApprovedIndicatorComponent } from "./components/approved-indicator/approved-indicator.component";
import { ButtonComponent } from "./components/button/button.component";
import { CaptchaComponent } from "./components/captcha-component/captcha.component";
import { CardComponent } from "./components/card/card.component";
import { DateSelectorComponent } from "./components/date-selector/date-selector.component";
import { EmployeeInfoComponent } from "./components/employee-info/employee-info.component";
import { FileInputComponent } from "./components/file-upload-button/file-input.component";
import { FilesManagerComponent } from "./components/files-manager/files-manager.component";
import { FormCardComponent } from "./components/form-card/form-card.component";
import { GenderDropdownComponent } from "./components/gender-dropdown/gender-dropdown.component";
import { InputComponent } from "./components/input/input.component";
import { MonthDropdownComponent } from "./components/month-dropdown/month-dropdown.component";
import { MoreToggleButtonComponent } from "./components/more-toggle-button/more-toggle-button.component";
import { NarrowPageComponent } from "./components/narrow-page/narrow-page.component";
import { SidenavComponent } from "./components/sidenav.component";
import { StaticFieldComponent } from "./components/static-field/static-field.component";
import { TermsOfServiceComponent } from "./components/terms-of-service/terms-of-service.component";
import { UserPictureComponent } from "./components/user-picture/user-picture.component";
import { YearSelectorComponent } from "./components/year-selector/year-selector.component";
import { CaptchaContainerComponent } from "./containers/captcha/captcha.container";
import { EmployeesAutocompleteComponent } from "./containers/employees-autocomplete/employees-autocomplete.component";
import { FromBlobDirective } from "./directives/from-blob.directive";
import { ScrollIntoViewOnInvalidDirective } from "./directives/scroll-into-view-on-invalid.directive";
import { ApiErrorPipe } from "./pipes/api-error.pipe";
import { CurrencyPipe } from "./pipes/currency.pipe";
import { DatePipe } from "./pipes/date.pipe";
import { DescribePipe } from "./pipes/describe/describe.pipe";
import { FormSegmentTranslationPipe } from "./pipes/form-segment-translation.pipe";
import { InputFeedbackPipe } from "./pipes/input-feedback.pipe";
import { NumberPipe } from "./pipes/number.pipe";
import { PercentPipe } from "./pipes/percent.pipe";
import { SwaggerApiErrorPipe } from "./pipes/swagger-api-error.pipe";

const COMPONENTS = [
  InputComponent,
  InputFeedbackPipe,
  ApiErrorPipe,
  DescribePipe,
  SwaggerApiErrorPipe,
  SidenavComponent,
  FormCardComponent,
  StaticFieldComponent,
  NarrowPageComponent,
  CardComponent,
  FileInputComponent,
  FilesManagerComponent,
  EmployeesAutocompleteComponent,
  FormSegmentTranslationPipe,
  MonthDropdownComponent,
  YearSelectorComponent,
  DateSelectorComponent,
  DatePipe,
  CurrencyPipe,
  NumberPipe,
  PercentPipe,
  ButtonComponent,
  ApprovedIndicatorComponent,
  CaptchaContainerComponent,
  CaptchaComponent,
  GenderDropdownComponent,
  FromBlobDirective,
  UserPictureComponent,
  EmployeeInfoComponent,
  TermsOfServiceComponent,
  MoreToggleButtonComponent,
  ScrollIntoViewOnInvalidDirective,
];

const SHARED_MODULES = [
  NgxCaptchaModule,
  MomentModule,
  TextMaskModule,
  RouterModule,
  CommonModule,
  FormsModule,
  ReactiveFormsModule,
  TranslateModule,
  MaterialModule,
  FileDropModule,
];

@NgModule({
  imports: [
    ...SHARED_MODULES,
    TranslateModule.forChild()
  ],
  exports: [
    ...COMPONENTS,
    ...SHARED_MODULES
  ],
  declarations: COMPONENTS,
  // SharedModule should not have providers https://angular.io/guide/ngmodule-faq#sharedmodule
  providers: undefined
})

export class SharedModule {
}
