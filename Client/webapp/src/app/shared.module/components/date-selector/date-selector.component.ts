import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Host, Input, OnDestroy, OnInit, Optional, SkipSelf } from "@angular/core";
import { ControlContainer, ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR } from "@angular/forms";
import { DateAdapter, ErrorStateMatcher, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from "@angular/material";
import { Moment } from "moment";
import { DeviceDetectorService } from "ngx-device-detector";
import { noop, Subject } from "rxjs/index";
import { distinctUntilChanged, takeUntil } from "rxjs/operators";
import {
   dateInputParseFormat,
   dateParseFormatInitializerFactory,
  } from "../../../core/datepicker/date-input-format";
import { NumberDateAdapter } from "../../../core/datepicker/number-date.adapter";
import { NavigatorLanguageProvider } from "../../../core/services/navigator.language.provider";
import { NowProvider } from "../../../core/services/now.provider";
import { DATE_NUMBER_LOCALE } from "../../../shared/constants/date-number-locale";
import { getFormControlTouched } from "../../utils/get-form-control-touched";

@Component({
  selector: "pr-date-selector",
  templateUrl: "./date-selector.component.html",
  styleUrls: ["./date-selector.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {provide: MAT_DATE_LOCALE, useValue: DATE_NUMBER_LOCALE},
    {provide: DateAdapter, useClass: NumberDateAdapter, deps: [MAT_DATE_LOCALE, NowProvider]},
    {provide: MAT_DATE_FORMATS, useFactory: dateParseFormatInitializerFactory, deps: [DeviceDetectorService]},
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: DateSelectorComponent,
      multi: true,
    }
  ]
})
export class DateSelectorComponent implements ControlValueAccessor, OnInit, OnDestroy {

  public get startAt(): number | null {
    return this._startAt
      ? Math.max(this._startAt, this.date.value ? this.date.value : 0)
      : undefined;
  }

  @Input()
  public set startAt(value: number | null) {
    this._startAt = value;
  }

  @Input()
  public placeholder: string;

  @Input()
  public formControlName: string;

  @Input()
  public min: number;

  @Input()
  public max: number;

  public matcher = {
    isErrorState: () => this.control && this.control.invalid && (this.control.dirty || this.control.touched)
  } as ErrorStateMatcher;

  public date = new FormControl();

  public control = new FormControl();

  private _startAt: number | null;

  private ngUnsubscribe$ = new Subject();

  private onTouchedCallback: () => void = noop;
  private onChangeCallback: (_: any) => void = noop;

  constructor(@Optional() @Host() @SkipSelf()
              private controlContainer: ControlContainer,
              private deviceService: DeviceDetectorService,
              private dateAdapter: DateAdapter<any>,
              private navigatorLanguageProvider: NavigatorLanguageProvider,
              private changeDetector: ChangeDetectorRef) {
  }

  @Input()
  public filter = () => true;

  public ngOnInit(): void {
    const navigatorLang = this.navigatorLanguageProvider.get();
    this.dateAdapter.setLocale(navigatorLang);

    if (this.controlContainer && this.formControlName) {
      this.control = this.controlContainer.control.get(this.formControlName) as FormControl;
      this.date.valueChanges
        .pipe(
          takeUntil(this.ngUnsubscribe$),
          distinctUntilChanged(undefined, value => value),
        )
        .subscribe((value: Moment) => {
          if (!value) {
            return;
          }
          if (typeof value === "number") {
            this.onChangeCallback(value);
            return;
          }
          this.onChangeCallback(value.valueOf());
        });

      getFormControlTouched(this.control)
        .pipe(takeUntil(this.ngUnsubscribe$))
        .subscribe(() => {
          this.changeDetector.markForCheck();
        });
    }
  }

  public ngOnDestroy(): void {
    this.ngUnsubscribe$.next();
    this.ngUnsubscribe$.complete();
  }

  public writeValue(value: number) {
    if (!value) return;
    this.date.setValue(value);
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

  public getMinValue() {
    if (!this.min) {
      return undefined;
    }
    return this.dateAdapter.format(this.min, dateInputParseFormat);
  }

  public getMaxValue() {
    if (!this.max) {
      return undefined;
    }
    return this.dateAdapter.format(this.max, dateInputParseFormat);
  }

  public isDatePickerHidden(): boolean {
    return !this.deviceService.isDesktop();
  }

  public getInputType() {
    return this.deviceService.isDesktop() ?
      "text" :
      "date";
  }
}
