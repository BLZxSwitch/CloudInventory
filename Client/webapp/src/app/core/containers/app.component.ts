import {ChangeDetectionStrategy, Component} from "@angular/core";
import {select, Store} from "@ngrx/store";

import * as fromAuth from "../../auth/reducers";
import {LanguageService} from "../services/language.service";

@Component({
  selector: "pr-app",
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <router-outlet></router-outlet>
  `
})
export class AppComponent {

  constructor(store: Store<fromAuth.IState>,
              languageService: LanguageService) {

    store.pipe(select(fromAuth.getLanguage))
      .subscribe(language => {
        languageService.setDefaultLanguage(language);
      });
  }
}
