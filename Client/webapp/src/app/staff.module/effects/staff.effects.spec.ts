import { cold, hot } from "jasmine-marbles";
import { createInjectorWithActions, TestActions } from "../../../unit-tests.components/mocks/actions";
import { get } from "../../../unit-tests.components/mocks/createInjector";
import { EmployeeDTO } from "../../core/services/service-proxies";
import { EmployeeAddRequest, EmployeeEditRequest } from "../../data/actions/employees.actions";
import { EmployeeSubmit } from "../actions/staff.actions";
import { StaffEffects } from "./staff.effects";

describe("StaffEffects", () => {

  let actions$: TestActions;

  beforeEach(() => {
    actions$ = createInjectorWithActions(StaffEffects);
  });

  describe("upsertEmployee$", () => {
    it("should return a EmployeeEditRequest on EmployeeSubmit when id is defined", () => {
      const effects = get<StaffEffects>();
      const employee = new EmployeeDTO();
      employee.id = "id";

      const completion = new EmployeeEditRequest({employee});

      actions$.stream = hot("-a", {
          a: new EmployeeSubmit({employee, invite: false})
        }
      );
      const expected = cold("-b", {b: completion});

      expect(effects.upsertEmployee$).toBeObservable(expected);
    });

    it("should return a EmployeeAddRequest on EmployeeSubmit when id is undefined", () => {
      const effects = get<StaffEffects>();
      const employee = new EmployeeDTO();

      const completion = new EmployeeAddRequest({employee, invite: false});

      actions$.stream = hot("-a", {
          a: new EmployeeSubmit({employee, invite: false})
        }
      );
      const expected = cold("-b", {b: completion});

      expect(effects.upsertEmployee$).toBeObservable(expected);
    });
  });
});
