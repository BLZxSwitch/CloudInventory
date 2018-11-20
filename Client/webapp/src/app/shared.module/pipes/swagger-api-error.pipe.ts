import { Pipe, PipeTransform } from "@angular/core";
import { TranslateService } from "@ngx-translate/core";
import { SwaggerException } from "../../core/services/service-proxies";

@Pipe({
  name: "prSwaggerApiError",
})
export class SwaggerApiErrorPipe implements PipeTransform {
  constructor(private translate: TranslateService) {
  }

  public transform(errorResponse: SwaggerException, args?: any): string {
    if (!errorResponse) return;

    return this.translate.instant(`FORM.API_ERROR.${errorResponse.response || "UNKNOWN_ERROR"}`);
  }
}
