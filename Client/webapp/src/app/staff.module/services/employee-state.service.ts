import {Injectable} from "@angular/core";
import {EmployeeDTO} from "../../core/services/service-proxies";
import {EmployeeState} from "../components/employee-state/employee-state";

@Injectable({
  providedIn: "root"
})
export class EmployeeStateService {

  public Get(employee: EmployeeDTO) {
    if (!employee.isActive) {
      return EmployeeState.IsDisabled;
    }
    if (employee.isActive && employee.isInvited && !employee.isInvitationAccepted) {
      return EmployeeState.IsInvited;
    }
    if (employee.isActive && !employee.isInvited && !employee.isInvitationAccepted) {
      return EmployeeState.IsNotInvited;
    }
    if (employee.isActive && employee.isInvitationAccepted) {
      return EmployeeState.IsActive;
    }
  }
}
