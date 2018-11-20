import { HttpClient } from "@angular/common/http";
import { Component, Input } from "@angular/core";
import { TranslateService } from "@ngx-translate/core";
import { startWith, switchMap } from "rxjs/operators";
import { RoutesService } from "../../../core/services/routes.service";
import { WindowProvider } from "../../../core/services/window-provider.provider";

@Component({
  selector: "pr-terms-of-service",
  templateUrl: "./terms-of-service.component.html",
  styleUrls: ["./terms-of-service.component.scss"]
})
export class TermsOfServiceComponent {

  @Input() public fullPage = true;

  @Input() public inDialog = false;

  public get termsOfServiceUrl() {
    return this.routesService.termsOfService();
  }

  public map = {
    en: "agb_en.html",
    de: "agb_de.html",
  };

  public html$ = this.translate.onLangChange.pipe(
    startWith({lang: this.translate.currentLang}),
    switchMap(({lang}) => this.http
      .get(`${this.windowProvider.getInstance().location.origin}/assets/tos/${this.map[lang]}`, {responseType: "text"}))
  );

  constructor(private windowProvider: WindowProvider,
              private http: HttpClient,
              private translate: TranslateService,
              private routesService: RoutesService) {
  }
}
