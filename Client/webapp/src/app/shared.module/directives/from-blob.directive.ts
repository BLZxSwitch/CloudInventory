import { Directive, ElementRef, Input } from "@angular/core";
import { FileResponse } from "../../core/services/service-proxies";

@Directive({
  selector: "[prFromBlob]"
})
export class FromBlobDirective {

  @Input("prFromBlob")
  public set blob(fileResponse: FileResponse) {
    if (fileResponse) {
      this.element.nativeElement.src = URL.createObjectURL(fileResponse.data);
    }
  }

  constructor(private element: ElementRef) {
  }
}
