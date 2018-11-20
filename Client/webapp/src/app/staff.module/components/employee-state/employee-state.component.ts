import {Component, Input} from "@angular/core";
import {EmployeeDTO} from "../../../core/services/service-proxies";
import {EmployeeStateService} from "../../services/employee-state.service";
import {EmployeeState} from "./employee-state";

@Component({
  selector: "pr-employee-state",
  templateUrl: "./employee-state.component.html",
  styleUrls: ["./employee-state.component.scss"]
})
export class EmployeeStateComponent {

  public EmployeeState = EmployeeState;

  @Input()
  public employee: EmployeeDTO;

  constructor(private employeeStateService: EmployeeStateService) {
  }

  public get State(): EmployeeState {
    return this.employeeStateService.Get(this.employee);
  }
}
