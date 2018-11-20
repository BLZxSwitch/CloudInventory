import { Component, OnDestroy } from "@angular/core";
import { FormBuilder } from "@angular/forms";
import { select, Store } from "@ngrx/store";
import { Subject } from "rxjs";
import { distinctUntilChanged, filter, takeUntil } from "rxjs/operators";
import { EmployeesFilterChanged } from "../../actions/employees-filter.actions";
import * as fromEmployee from "../../reducers";
import { getEmployeesFilterPattern } from "../../reducers";

@Component({
  selector: "pr-employees-filter",
  styleUrls: ["./employees-filter.component.scss"],
  templateUrl: "./employees-filter.component.html"
})
export class EmployeesFilterComponent implements OnDestroy {
  public filterPattern$ = this.store.pipe(select(getEmployeesFilterPattern), filter(value => value !== undefined));

  public form = this.formBuilder.group({
    filterPattern: [""]
  });

  private ngUnsubscribe$ = new Subject();

  constructor(
    private formBuilder: FormBuilder,
    private store: Store<fromEmployee.IState>) {

    this.filterPattern$.pipe(distinctUntilChanged(),
      takeUntil(this.ngUnsubscribe$)
    ).subscribe(filterPattern => {
      this.form.get("filterPattern").setValue(filterPattern, {emitEvent: false});
    });

    this.form.valueChanges.pipe(
      takeUntil(this.ngUnsubscribe$)
    ).subscribe(value => {
      this.store.dispatch(new EmployeesFilterChanged(value));
    });
  }

  public ngOnDestroy() {
    this.ngUnsubscribe$.next();
    this.ngUnsubscribe$.complete();
  }
}
