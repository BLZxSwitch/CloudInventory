import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Host,
  Input,
  OnDestroy,
  OnInit,
  Optional,
  SkipSelf,
  ViewChild
} from "@angular/core";
import { ControlContainer, ControlValueAccessor, FormBuilder, FormControl, NG_VALUE_ACCESSOR } from "@angular/forms";
import { ErrorStateMatcher, MatAutocomplete, MatAutocompleteTrigger } from "@angular/material";
import { select, Store } from "@ngrx/store";
import { TranslateService } from "@ngx-translate/core";
import { combineLatest, noop } from "rxjs";
import { Subject } from "rxjs/index";
import { BehaviorSubject } from "rxjs/internal/BehaviorSubject";
import { Observable } from "rxjs/internal/Observable";
import { map, startWith, takeUntil, withLatestFrom } from "rxjs/operators";
import { EmployeesLoad } from "../../../data/actions/employees.actions";
import * as fromData from "../../../data/reducers";
import { getFormControlTouched } from "../../utils/get-form-control-touched";

class Option {
  public name: string;
  public value: string;
}

@Component({
  selector: "pr-employees-autocomplete",
  templateUrl: "./employees-autocomplete.component.html",
  styles: [`
    .mat-form-field {
      width: 100%;
    }
  `],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: EmployeesAutocompleteComponent,
    multi: true,
  }],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EmployeesAutocompleteComponent implements ControlValueAccessor, OnDestroy, OnInit, AfterViewInit {

  @Input() public formControlName: string;

  @Input()
  public set displayEmptyOption(value: boolean) {
    this.displayEmptyOption$.next(value);
  }

  @Input() public placeholder: string;

  @Input() public static: boolean;

  @ViewChild(MatAutocomplete) public autocomplete: MatAutocomplete;

  @ViewChild(MatAutocompleteTrigger) public autocompleteTrigger: MatAutocompleteTrigger;

  public control: FormControl;

  public form = this.formBuilder.group({
    searchText: [""]
  });

  public matcher = {
    isErrorState: () => this.control && this.control.invalid && (this.control.dirty || this.control.touched)
  } as ErrorStateMatcher;

  public employeeId: string;

  public displayEmptyOption$ = new BehaviorSubject(true);

  public employees$ = this.store.pipe(select(fromData.getAllEmployees));

  public employeeFullName$ = this.employees$
    .pipe(
      map(employees => employees.find(({id}) => id === this.employeeId)),
      map(employee => employee && employee.fullName)
    );

  public options: Option[];

  public options$: Observable<Option[]> = combineLatest(this.employees$, this.displayEmptyOption$)
    .pipe(
      map(([employees, displayEmptyOption]) => {
          const emptyOptions = displayEmptyOption
            ? [{name: this.translate.instant("COMMON.FILTER.ALL"), value: undefined}]
            : [];

          return [
            ...emptyOptions,
            ...employees.map(
              ({id, fullName}) => ({
                name: fullName,
                value: id
              })
            ),
          ];
        }
      )
    );

  public searchText$ = this.form.get("searchText").valueChanges.pipe(
    startWith(""),
    withLatestFrom(this.options$),
    map(([value, options]) => {
      const selectedOption = options.find(option => option.value === value);

      return selectedOption ? selectedOption.name : value;
    })
  );

  public optionsFiltered$ = combineLatest(this.options$, this.searchText$).pipe(
    map(([options, searchText]) => options.filter(
      ({name}) => !searchText || name.toLocaleLowerCase().includes(searchText.toLocaleLowerCase()))
    )
  );

  private ngUnsubscribe$ = new Subject();
  private onTouchedCallback: () => void = noop;
  private onChangeCallback: (_: any) => void = noop;
  private ngAfterViewInitCalled = false;

  constructor(
    private translate: TranslateService,
    private formBuilder: FormBuilder,
    @Optional() @Host() @SkipSelf()
    private controlContainer: ControlContainer,
    private changeDetector: ChangeDetectorRef,
    private store: Store<fromData.IState>) {
  }

  public ngAfterViewInit() {
    this.options$
      .pipe(
        takeUntil(this.ngUnsubscribe$)
      )
      .subscribe(options => {
        this.options = options;
        this.autocompleteTrigger.writeValue(this.displayFn());
      });
    this.ngAfterViewInitCalled = true;
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

  public ngOnDestroy() {
    this.ngUnsubscribe$.next();
    this.ngUnsubscribe$.complete();
  }

  public deselectEmployee() {
    this.changeValue(undefined);
  }

  public trackByFn(index: number, {id}) {
    return id;
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

  public writeValue(employeeId: string): void {
    this.employeeId = employeeId;
    this.form.get("searchText").setValue("");
    if (this.ngAfterViewInitCalled) {
      this.ngAfterViewInit();
    }
  }

  public onValueChange($event) {
    if ($event.source.selected) {
      this.changeValue($event.source.value);
    }
  }

  public changeValue(employeeId) {
    this.onChangeCallback(employeeId);
    this.employeeId = employeeId;
  }

  public displayFn = (): string | undefined => {
    const currentOption = this.options.find(option => option.value === this.employeeId);

    return currentOption ? currentOption.name : "";
  };
}
