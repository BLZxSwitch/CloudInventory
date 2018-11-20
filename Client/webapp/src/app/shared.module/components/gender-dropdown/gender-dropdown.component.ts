import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Host, Input, OnDestroy, OnInit, Optional, SkipSelf } from "@angular/core";
import { ControlContainer, ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR } from "@angular/forms";
import { noop, Subject } from "rxjs";
import { takeUntil } from "rxjs/operators";
import { Gender } from "../../../core/services/service-proxies";
import { getFormControlTouched } from "../../utils/get-form-control-touched";

@Component({
  selector: "pr-gender-dropdown",
  templateUrl: "./gender-dropdown.component.html",
  styles: [`
    .mat-form-field {
      width: 100%;
    }
  `],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: GenderDropdownComponent,
    multi: true,
  }],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GenderDropdownComponent implements ControlValueAccessor, OnInit, OnDestroy {

  @Input() public formControlName: string;
  @Input() public placeholder: string;

  public control: FormControl;

  public genderOptions = Object.keys(Gender)
    .map(key => Gender[key])
    .filter(value => typeof value === "string")
    .map(gender => ({name: `COMMON.GENDER.${gender.toUpperCase()}`, value: Gender[gender]}));

  private onTouchedCallback: () => void = noop;
  private onChangeCallback: (_: any) => void = noop;
  private ngUnsubscribe$ = new Subject();

  constructor(@Optional() @Host() @SkipSelf()
              private controlContainer: ControlContainer,
              private changeDetector: ChangeDetectorRef) {
  }

  public ngOnInit() {
    if (this.controlContainer && this.formControlName) {
      this.control = this.controlContainer.control.get(this.formControlName) as FormControl;

      getFormControlTouched(this.control)
        .pipe(takeUntil(this.ngUnsubscribe$))
        .subscribe(() => {
          this.changeDetector.markForCheck();
        });
    }
  }

  public trackByFn(index: number) {
    return index;
  }

  public registerOnChange(fn: any) {
    this.onChangeCallback = fn;
  }

  public registerOnTouched(fn: any) {
    this.onTouchedCallback = fn;
  }

  public setDisabledState(isDisabled: boolean): void {
    // nothing yet
  }

  public writeValue(value: boolean): void {
    // nothing yet
  }

  public ngOnDestroy() {
    this.ngUnsubscribe$.next();
    this.ngUnsubscribe$.complete();
  }
}
