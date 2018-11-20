import {Injectable} from "@angular/core";
import {TranslateService} from "@ngx-translate/core";
import { defaultCultureName } from "../../shared/translate/cultureName";

@Injectable()
export class LanguageService {

  public avialableLanguages = [
    defaultCultureName(),
    "en"
  ];

  constructor(
    private translate: TranslateService) {
  }

  public setDefaultLanguage(cultureName: string) {
    let language: string;
    if (cultureName) {
      language = cultureName;
    } else {
      const browserLang = this.translate.getBrowserLang();
      if (this.avialableLanguages.indexOf(browserLang) !== -1) {
        language = browserLang;
      } else {
        language = defaultCultureName();
      }
    }
    this.translate.setDefaultLang(language);
    this.translate.use(language);
  }
}
