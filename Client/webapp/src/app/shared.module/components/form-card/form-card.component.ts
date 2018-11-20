import { Component, EventEmitter, Input, Output } from "@angular/core";
import { FormGroup } from "@angular/forms";

@Component({
  selector: "pr-form-card",
  templateUrl: "./form-card.component.html",
  styleUrls: ["./form-card.component.scss"]
})
export class FormCardComponent {
  @Input()
  public formGroup: FormGroup = null !;
}
