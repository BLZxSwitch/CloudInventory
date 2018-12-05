import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { Subject } from "rxjs/index";
import { takeUntil } from "rxjs/operators";
import { AutoSubmitPipeBehavior } from "../../services/auto-submit.pipe-behavior";
import { OrgUnitsFilterFormProvider } from "../../services/org-units.filter-form.provider";
import { IOrgUnitsFilterFormModel } from "./org-units.filter-form.model";

@Component({
  selector: "pr-org-units-filter-form",
  styleUrls: ["./org-units.filter-form.component.scss"],
  templateUrl: "./org-units.filter-form.component.html"
})
export class OrgUnitsFilterFormComponent implements OnInit, OnDestroy {

  @Input()
  public set filter(filter: string) {
    this.form.setValue({filter});
  }

  @Output()
  public submitted = new EventEmitter<string>();

  public form: FormGroup;

  private ngUnsubscribe$ = new Subject();

  public static readonly formFilterProjector = (formValues: IOrgUnitsFilterFormModel) => formValues.filter;

  constructor(
    private orgUnitsFilterFormProvider: OrgUnitsFilterFormProvider,
    private autoSubmitPipeBehavior: AutoSubmitPipeBehavior) {

    this.form = orgUnitsFilterFormProvider.get();
  }

  public ngOnInit(): void {
    this.form.valueChanges
      .pipe(
        this.autoSubmitPipeBehavior.get(OrgUnitsFilterFormComponent.formFilterProjector),
        takeUntil(this.ngUnsubscribe$),
      )
      .subscribe((formValues: IOrgUnitsFilterFormModel) => this.submitted.emit(formValues.filter));
  }

  public ngOnDestroy() {
    this.ngUnsubscribe$.next();
    this.ngUnsubscribe$.complete();
  }
}
