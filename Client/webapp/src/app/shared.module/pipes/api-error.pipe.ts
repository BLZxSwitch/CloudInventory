import { HttpErrorResponse } from "@angular/common/http";
import { Pipe, PipeTransform } from "@angular/core";
import { TranslateService } from "@ngx-translate/core";

@Pipe({
  name: "prApiError",
})
export class ApiErrorPipe implements PipeTransform {
  constructor(private translate: TranslateService) {
  }

  public transform(errorResponse: HttpErrorResponse, args?: any): string {
    if (!errorResponse) return;

    return this.translate.instant(`FORM.API_ERROR.${errorResponse.error || "UNKNOWN_ERROR"}`);
  }
}
