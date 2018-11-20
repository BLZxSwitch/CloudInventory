import {
  ChangeDetectionStrategy, ChangeDetectorRef,
  Component,
  Host,
  Input,
  OnDestroy,
  OnInit,
  Optional,
  SkipSelf,
} from "@angular/core";
import { ControlContainer, ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR } from "@angular/forms";
import { ErrorStateMatcher } from "@angular/material";
import { noop } from "rxjs";
import { Subject } from "rxjs";
import { takeUntil } from "rxjs/operators";
import { getFormControlTouched } from "../../utils/get-form-control-touched";

@Component({
  selector: "pr-input",
  templateUrl: "./input.component.html",
  styleUrls: ["./input.component.scss"],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: InputComponent,
    multi: true,
  }],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InputComponent implements ControlValueAccessor, OnInit, OnDestroy {

  @Input() public formControlName: string;
  @Input() public type: string;
  @Input() public placeholder: string;
  @Input() public mask: any;
  @Input() public inputmode: string;
  @Input() public pattern: string;
  @Input() public id: string;
  @Input() public autoComplete: string;

  public input = new FormControl();
  public control: FormControl;

  public matcher = {
    isErrorState: () => this.control && this.control.invalid && (this.control.dirty || this.control.touched)
  } as ErrorStateMatcher;

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

    this.input.valueChanges
      .pipe(takeUntil(this.ngUnsubscribe$))
      .subscribe(value => {
        this.onChangeCallback(value);
      });
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

  public writeValue(value: string): void {
    if (this.input.value !== value) {
      this.input.setValue(value, {
        emitEvent: false
      });
      this.changeDetector.markForCheck();
    }
  }

  public ngOnDestroy() {
    this.ngUnsubscribe$.next();
    this.ngUnsubscribe$.complete();
  }
}
