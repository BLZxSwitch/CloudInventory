import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Host, Input, OnDestroy, OnInit, Optional, SkipSelf } from "@angular/core";
import { ControlContainer, ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR } from "@angular/forms";
import { noop, Subject } from "rxjs";
import { takeUntil } from "rxjs/operators";
import { getFormControlTouched } from "../../utils/get-form-control-touched";

class Option {
  public name: string;
  public value: string;
}

@Component({
  selector: "pr-month-dropdown",
  templateUrl: "./month-dropdown.component.html",
  styles: [`
    .mat-form-field {
      width: 100%;
    }
  `],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: MonthDropdownComponent,
    multi: true,
  }],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MonthDropdownComponent implements ControlValueAccessor, OnInit, OnDestroy {

  @Input() public showAll: boolean;
  @Input() public extraOptions: Option[] = [];
  @Input() public formControlName: string;
  @Input() public placeholder: string;

  public control: FormControl;

  public get months() {
    const showAll = this.showAll
      ? [{
        value: undefined,
        name: "COMMON.FILTER.ALL",
      }]
      : [];
    return [
      ...showAll,
      ...this.extraOptions,
      ...[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map(month => ({
        name: `COMMON.MONTHS.${month}`,
        value: month,
      }))
    ];
  }

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
