import { ChangeDetectionStrategy, Component } from "@angular/core";
import { select, Store } from "@ngrx/store";
import { getEmployeeId } from "../../../auth/reducers";
import {EmployeeDTO} from "../../../core/services/service-proxies";
import { EmployeeAdd, EmployeeDelete, EmployeeEdit, EmployeeSendInvitation } from "../../actions/staff.actions";
import * as fromStaff from "../../reducers";
import { getAllEmployeesFilteredSelector } from "../../reducers/get-all-employees-filtered.selector";

@Component({
  selector: "pr-employees-list-page",
  templateUrl: "./employees-list-page.component.html",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EmployeesListPageComponent {

  public employees$ = this.store.pipe(select(getAllEmployeesFilteredSelector));

  public employeeId$ = this.store.pipe(select(getEmployeeId));

  constructor(private store: Store<fromStaff.IState>) {
  }

  public onEdit(id) {
    this.store.dispatch(new EmployeeEdit({employeeId: id}));
  }

  public onDelete(id) {
    this.store.dispatch(new EmployeeDelete({employeeId: id}));
  }

  public trackByFn(index, {id}) {
    return id;
  }

  public onEntityAdd() {
    this.store.dispatch(new EmployeeAdd());
  }

  public onSendInvitation(data: EmployeeDTO) {
    this.store.dispatch(new EmployeeSendInvitation(({employee: data})));
  }
}
