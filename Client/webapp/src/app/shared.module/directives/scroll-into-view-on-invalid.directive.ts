import { ContentChildren, Directive, ElementRef } from "@angular/core";
import { FormControlName } from "@angular/forms";

@Directive({
  selector: "[prScrollIntoViewOnInvalid]",
  queries: {
    formControls: new ContentChildren(FormControlName),
    formControlElements: new ContentChildren(FormControlName),
  },
})
export class ScrollIntoViewOnInvalidDirective {

  constructor(private element: ElementRef) {
  }

  public scroll() {
    const elements = [...this.element.nativeElement.querySelectorAll(".ng-invalid")]
      .sort((a, b) => a.getBoundingClientRect().top - b.getBoundingClientRect().top);

    if (elements.length > 0) {
      elements[0].scrollIntoView({
        behavior: "smooth",
        inline: "nearest",
        block: "center",
      });
    }
  }
}
