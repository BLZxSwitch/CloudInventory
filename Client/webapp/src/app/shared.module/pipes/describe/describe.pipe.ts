import { Pipe, PipeTransform } from "@angular/core";
import { Observable, of } from "rxjs";
import { switchMap } from "rxjs/operators";
import { DescriptionProvider } from "../../../core/services/description.provider/description.provider";
import { TranslatableService } from "../../../core/services/translate/translatable.service";

@Pipe({name: "prDescribe"})
export class DescribePipe implements PipeTransform {
  constructor(private descriptionProvider: DescriptionProvider,
              private translatableService: TranslatableService) {

  }

  public transform(value: Observable<any>): Observable<string> {
    return value.pipe(
      switchMap(descriptable => {
        const translatable = this.descriptionProvider.get(descriptable);
        if (translatable === undefined) {
          return of(descriptable);
        }
        return this.translatableService.get(translatable);
      })
    );
  }
}
