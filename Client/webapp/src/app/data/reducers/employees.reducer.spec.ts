import { EmployeeDTO } from "../../core/services/service-proxies";
import {
  EmployeeAddAndSendInvitationSuccess,
  EmployeeAddSuccess,
  EmployeeEditSuccess,
  EmployeeInviteAfterAddRequest,
  EmployeeSendInvitationSuccess,
  EmployeesLoadSuccess
} from "../actions/employees.actions";
import { initialState, reducer } from "./employees.reducer";

describe("Employees Reducer", () => {
  describe("unknown action", () => {
    it("should return the initial state", () => {
      const action = {} as any;

      const result = reducer(initialState, action);

      expect(result).toBe(initialState);
    });
  });

  describe("EmployeesLoadSuccess action", () => {
    it("should add employees", () => {
      const employees = [EmployeeDTO.fromJS({id: 1}), EmployeeDTO.fromJS({id: 2})];
      const action = new EmployeesLoadSuccess({employees});

      const result = reducer({entities: {}, ids: []}, action);

      expect(result).toEqual({
        entities: {
          1: employees[0],
          2: employees[1]
        },
        ids: [1, 2]
      });
    });
  });

  describe("EmployeeAddSuccess action", () => {
    it("should add 1 employee", () => {
      const employee = EmployeeDTO.fromJS({id: 2});
      const action = new EmployeeAddSuccess({employee});

      const result = reducer({
        entities: {
          1: EmployeeDTO.fromJS({id: 1})
        },
        ids: [1]
      }, action);

      expect(result).toEqual({
        entities: {
          1: EmployeeDTO.fromJS({id: 1}),
          2: employee
        },
        ids: [1, 2]
      });
    });
  });

  describe("EmployeeAddAndSendInvitationSuccess action", () => {
    it("should add 1 employee", () => {
      const employee = EmployeeDTO.fromJS({id: 2});
      const action = new EmployeeInviteAfterAddRequest({employee});

      const result = reducer({
        entities: {
          1: EmployeeDTO.fromJS({id: 1})
        },
        ids: [1]
      }, action);

      expect(result).toEqual({
        entities: {
          1: EmployeeDTO.fromJS({id: 1}),
          2: employee
        },
        ids: [1, 2]
      });
    });
  });

  describe("EmployeeEditSuccess action", () => {
    it("should edit employee", () => {
      const employee = EmployeeDTO.fromJS({id: 1, firstName: "John"});
      const action = new EmployeeEditSuccess({employee});

      const result = reducer({
        entities: {
          1: EmployeeDTO.fromJS({
            id: 1,
            firstName: "Sam"
          })
        },
        ids: [1]
      }, action);

      expect(JSON.stringify(result)).toEqual(JSON.stringify({
        entities: {
          1: employee,
        },
        ids: [1]
      }));
    });
  });

  describe("EmployeeSendInvitationSuccess action", () => {
    it("should edit employee", () => {
      const employee = EmployeeDTO.fromJS({id: 1, firstName: "John"});
      const action = new EmployeeSendInvitationSuccess({employee});

      const result = reducer({
        entities: {
          1: EmployeeDTO.fromJS({
            id: 1,
            firstName: "Sam"
          })
        },
        ids: [1]
      }, action);

      expect(JSON.stringify(result)).toEqual(JSON.stringify({
        entities: {
          1: employee,
        },
        ids: [1]
      }));
    });
  });

  describe("EmployeeAddAndSendInvitationSuccess action", () => {
    it("should edit employee", () => {
      const employee = EmployeeDTO.fromJS({id: 1, firstName: "John"});
      const action = new EmployeeAddAndSendInvitationSuccess({employee});

      const result = reducer({
        entities: {
          1: EmployeeDTO.fromJS({
            id: 1,
            firstName: "Sam"
          })
        },
        ids: [1]
      }, action);

      expect(JSON.stringify(result)).toEqual(JSON.stringify({
        entities: {
          1: employee,
        },
        ids: [1]
      }));
    });
  });
});
