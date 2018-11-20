import { ChangeDetectionStrategy, Component, Input, OnDestroy, OnInit } from "@angular/core";
import { ControlValueAccessor, FormBuilder, FormControl, NG_VALUE_ACCESSOR, Validators } from "@angular/forms";
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE, MatDatepicker } from "@angular/material";
import { MomentDateAdapter } from "@angular/material-moment-adapter";
import * as moment from "moment";
import { Moment } from "moment";
import { noop, Subject } from "rxjs/index";
import { distinctUntilChanged, takeUntil } from "rxjs/operators";

export const FORMATS = {
  parse: {
    dateInput: "YYYY"
  },
  display: {
    dateInput: "YYYY",
  }
};

@Component({
  selector: "pr-year-selector",
  templateUrl: "./year-selector.component.html",
  styleUrls: ["./year-selector.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {provide: MAT_DATE_FORMATS, useValue: FORMATS},
    {provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE]},
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: YearSelectorComponent,
      multi: true,
    }
  ]
})
export class YearSelectorComponent implements ControlValueAccessor, OnInit, OnDestroy {

  @Input()
  public placeholder: string;

  public date: FormControl;
  public value: number;

  private ngUnsubscribe$ = new Subject();

  private onTouchedCallback: () => void = noop;
  private onChangeCallback: (_: any) => void = noop;

  constructor(private formBuilder: FormBuilder) {
    this.createDateControl();
  }

  public ngOnInit(): void {
    this.date.valueChanges
      .pipe(
        takeUntil(this.ngUnsubscribe$),
        distinctUntilChanged(undefined, value => value && value.valueOf()),
      )
      .subscribe((value: Moment) => {
        this.value = value.year();
        this.onChangeCallback(value && value.year());
      });
  }

  public ngOnDestroy(): void {
    this.ngUnsubscribe$.next();
    this.ngUnsubscribe$.complete();
  }

  public chosenYearHandler(normalizedYear: Moment, datepicker: MatDatepicker<Moment>): void {
    const value = this.date.value || moment();
    value.year(normalizedYear.year());
    this.date.setValue(value);
    datepicker.close();
  }

  public writeValue(year: number) {
    if (!year || year === this.value) return;
    this.date.setValue(moment({year}));
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

  private createDateControl(): void {
    this.date = this.formBuilder.control(undefined, [Validators.required]);
  }
}
