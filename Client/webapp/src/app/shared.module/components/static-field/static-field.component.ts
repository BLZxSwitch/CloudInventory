import { ChangeDetectionStrategy, Component, Input } from "@angular/core";
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from "@angular/forms";

@Component({
  selector: "pr-static-field",
  templateUrl: "./static-field.component.html",
  styleUrls: ["./static-field.component.scss"],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: StaticFieldComponent,
    multi: true,
  }],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class StaticFieldComponent implements ControlValueAccessor {

  @Input() public label: string;
  @Input() public value: string | boolean;

  public get checkbox() {
    return typeof(this.value) === typeof(true);
  }

  public get hasValue() {
    return this.value !== undefined;
  }

  public registerOnChange(fn: any) {
    // nothing
  }

  public registerOnTouched(fn: any) {
    // nothing
  }

  public setDisabledState(isDisabled: boolean): void {
    // nothing
  }

  public writeValue(value: string): void {
    this.value = value;
  }
}
