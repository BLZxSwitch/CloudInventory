import { createEntityAdapter, EntityAdapter, EntityState } from "@ngrx/entity";
import { EmployeeDTO, IEmployeeDTO } from "../../core/services/service-proxies";
import { EmployeesActionsUnion, EmployeesActionTypes } from "../actions/employees.actions";

export interface IState extends EntityState<IEmployeeDTO> {

}

export const adapter: EntityAdapter<IEmployeeDTO> = createEntityAdapter<IEmployeeDTO>({
  selectId: (employee: IEmployeeDTO) => employee.id,
  sortComparer: false,
});

export const initialState: IState = adapter.getInitialState();

export function reducer(state = initialState, action: EmployeesActionsUnion): IState {
  switch (action.type) {

    case EmployeesActionTypes.EmployeesLoadSuccess: {
      return adapter.upsertMany(action.payload.employees, {
        ...state
      });
    }

    case EmployeesActionTypes.EmployeeAddSuccess: {
      return adapter.upsertOne(action.payload.employee, {
        ...state
      });
    }

    case EmployeesActionTypes.EmployeeInviteAfterAddRequest: {
      return adapter.upsertOne(action.payload.employee, {
        ...state
      });
    }

    case EmployeesActionTypes.EmployeeEditSuccess: {
      return adapter.updateOne({
        id: action.payload.employee.id,
        changes: action.payload.employee
      }, {
        ...state
      });
    }

    case EmployeesActionTypes.EmployeeDeleteSuccess: {
      return adapter.removeOne(action.payload.employeeId, {
        ...state
      });
    }

    case EmployeesActionTypes.EmployeeSendInvitationSuccess: {
      return adapter.updateOne({
        id: action.payload.employee.id,
        changes: action.payload.employee
      }, {
        ...state
      });
    }

    case EmployeesActionTypes.EmployeeAddAndSendInvitationSuccess: {
      return adapter.updateOne({
        id: action.payload.employee.id,
        changes: action.payload.employee
      }, {
        ...state
      });
    }

    default:
      return state;
  }
}
