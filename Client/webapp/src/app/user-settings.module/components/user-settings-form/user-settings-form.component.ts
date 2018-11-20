import { ChangeDetectionStrategy, Component, Input } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Observable } from "rxjs/index";
import { LanguageService } from "../../../core/services/language.service";
import { FileResponse, UserPictureServiceProxy, UserSettingsDTO, UserSettingsServiceProxy } from "../../../core/services/service-proxies";
import { BasicFormComponent } from "../../../shared.module/base-components/basic-form-component";

@Component({
  selector: "pr-user-settings-form",
  styleUrls: ["./user-settings-form.component.scss"],
  templateUrl: "./user-settings-form.component.html",
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserSettingsFormComponent extends BasicFormComponent {

  public userPicture$: Observable<FileResponse>;

  get userSettings(): UserSettingsDTO {
    return this._userSettings;
  }

  @Input()
  set userSettings(value: UserSettingsDTO) {
    this._userSettings = value;
    const model = this.getFormFromDto(value);

    if (model) {
      this.form.patchValue(model);
    }

    if (this.hasUserPicture) {
      this.userPicture$ = this.userPictureServiceProxy.getUserPicture();
    }
  }

  get hasUserPicture(): boolean {
    return this.userSettings.hasUserPicture;
  }

  public form: FormGroup;

  public languages: string[] = this.languageService.avialableLanguages;

  private _userSettings: UserSettingsDTO;

  constructor(private formBuilder: FormBuilder,
              private userPictureServiceProxy: UserPictureServiceProxy,
              private languageService: LanguageService) {
    super();

    this.createForm();
    this.transformFormData = data => this.getDtoFromForm(data);
  }

  public getlanguageTranslationKey(language) {
    return `COMMON.LANGUAGE.${language.toUpperCase()}`;
  }

  public trackByFn(index) {
    return index;
  }

  private createForm() {
    this.form = this.formBuilder.group({
      language: ["", Validators.required]
    });
  }

  private getFormFromDto(value: UserSettingsDTO) {
    return {
      language: value.language
    };
  }

  private getDtoFromForm(formValue): UserSettingsDTO {
    if (!formValue) return undefined;

    return new UserSettingsDTO({
      ...this.userSettings,
      language: formValue.language
    });
  }
}
