import { EventEmitter, Input, Output, ViewChild } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { ReplaySubject } from "rxjs/internal/ReplaySubject";
import { ScrollIntoViewOnInvalidDirective } from "../directives/scroll-into-view-on-invalid.directive";

export class BasicFormComponent {

  get pending(): boolean {
    return this._pending;
  }

  @Input()
  set pending(isPending: boolean) {
    this._pending = isPending;
    if (isPending) {
      this.form.disable();
    } else {
      this.form.enable();
    }
    this.pending$.next(this._pending);
  }

  @Input() public errorMessage: string | undefined;

  @Output() public submitForm = new EventEmitter<any>();

  @Output() public cancel = new EventEmitter<undefined>();

  @ViewChild(ScrollIntoViewOnInvalidDirective) public scrollIntoViewOnInvalidDirective: ScrollIntoViewOnInvalidDirective;

  public form: FormGroup;

  protected pending$ = new ReplaySubject<boolean>(1);

  private _pending: boolean;

  public onSubmit() {
    if (this.form.valid) {
      this.submitForm.emit(this.transformFormData(this.form.getRawValue()));
    } else {
      this.markAsTouched();
      if (this.scrollIntoViewOnInvalidDirective) {
        this.scrollIntoViewOnInvalidDirective.scroll();
      }
    }
  }

  public markAsTouched() {
    this.markAsTouchedRecursive(this.form);
  }

  public onCancel() {
    this.cancel.emit();
  }

  protected transformFormData = data => data;

  protected markAsTouchedRecursive(control) {
    control.markAsTouched();

    if (control.controls) {
      Object.keys(control.controls)
        .forEach(key => this.markAsTouchedRecursive(control.controls[key]));
    }
  }
}
