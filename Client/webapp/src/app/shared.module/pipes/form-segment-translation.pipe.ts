import { Pipe, PipeTransform } from "@angular/core";
import { TranslateService } from "@ngx-translate/core";

@Pipe({
  name: "prFormSegmentTranslation"
})
export class FormSegmentTranslationPipe implements PipeTransform {

  constructor(private translate: TranslateService) {
  }

  public transform(segment: any, type): any {
    return this.translate.instant(`FORM.${segment}.${type}`.toUpperCase());
  }
}
