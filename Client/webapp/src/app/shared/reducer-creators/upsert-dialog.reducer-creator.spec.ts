import { EmployeeDTO } from "../../core/services/service-proxies";
import {
  EmployeeAddAndSendInvitationSuccess,
  EmployeeAddFailure,
  EmployeeAddRequest,
  EmployeeAddSuccess,
  EmployeeEditFailure,
  EmployeeEditRequest,
  EmployeeEditSuccess,
  EmployeeInviteAfterAddRequest,
  EmployeesActionTypes,
  EmployeeSendInvitationFailure,
  EmployeeSendInvitationRequest,
  EmployeeSendInvitationSuccess
} from "../../data/actions/employees.actions";
import { createUpsertDialogReducer, getPendingState, initialState, IState } from "./upsert-dialog.reducer-creator";

describe("createBasicPageReducer", () => {

  let upsertDialogReducer;

  beforeEach(() => {
    upsertDialogReducer = createUpsertDialogReducer([
        EmployeesActionTypes.EmployeeAddRequest,
        EmployeesActionTypes.EmployeeEditRequest,
        EmployeesActionTypes.EmployeeSendInvitationRequest,
        EmployeesActionTypes.EmployeeInviteAfterAddRequest],
      [EmployeesActionTypes.EmployeeEditSuccess,
        EmployeesActionTypes.EmployeeAddSuccess,
        EmployeesActionTypes.EmployeeSendInvitationSuccess,
        EmployeesActionTypes.EmployeeAddAndSendInvitationSuccess,
        EmployeesActionTypes.EmployeeAddFailure,
        EmployeesActionTypes.EmployeeEditFailure,
        EmployeesActionTypes.EmployeeSendInvitationFailure]);
  });

  describe("unknown action", () => {
    it("should return the initial state", () => {
      const action = {} as any;

      const result = upsertDialogReducer(initialState, action);

      expect(result).toBe(initialState);
    });
  });

  function turnOnPendingCase(action) {
    const result = upsertDialogReducer({pending: false}, action);

    expect(result).toEqual({
      pending: true,
    });
  }

  describe("EmployeeAddRequest action", () => {
    it("turn on pending", () => {
      const action = new EmployeeAddRequest({employee: new EmployeeDTO(), invite: false});

      turnOnPendingCase(action);
    });
  });

  describe("EmployeeEditRequest action", () => {
    it("turn on pending", () => {
      const action = new EmployeeEditRequest({employee: new EmployeeDTO()});

      turnOnPendingCase(action);
    });
  });

  describe("EmployeeSendInvitationRequest action", () => {
    it("turn on pending", () => {
      const action = new EmployeeSendInvitationRequest({employee: new EmployeeDTO()});

      turnOnPendingCase(action);
    });
  });
  describe("EmployeeInviteAfterAddRequest action", () => {
    it("turn on pending", () => {
      const action = new EmployeeInviteAfterAddRequest({employee: new EmployeeDTO()});

      turnOnPendingCase(action);
    });
  });

  function turnOffPendingCase(action) {
    const result = upsertDialogReducer({pending: true}, action);

    expect(result).toEqual({
      pending: false,
    });
  }

  describe("EmployeeEditSuccess action", () => {
    it("turn off pending", () => {
      const action = new EmployeeEditSuccess({employee: new EmployeeDTO()});

      turnOffPendingCase(action);
    });
  });

  describe("EmployeeAddSuccess action", () => {
    it("turn off pending", () => {
      const action = new EmployeeAddSuccess({employee: new EmployeeDTO()});

      turnOffPendingCase(action);
    });
  });

  describe("EmployeeAddFailure action", () => {
    it("turn off pending", () => {
      const action = new EmployeeAddFailure(undefined);

      turnOffPendingCase(action);
    });
  });

  describe("EmployeeEditFailure action", () => {
    it("turn off pending", () => {
      const action = new EmployeeEditFailure(undefined);

      turnOffPendingCase(action);
    });
  });

  describe("EmployeeSendInvitationSuccess action", () => {
    it("turn off pending", () => {
      const action = new EmployeeSendInvitationSuccess(undefined);

      turnOffPendingCase(action);
    });
  });

  describe("EmployeeSendInvitationFailure action", () => {
    it("turn off pending", () => {
      const action = new EmployeeSendInvitationFailure(undefined);

      turnOffPendingCase(action);
    });
  });

  describe("EmployeeAddAndSendInvitationSuccess action", () => {
    it("turn off pending", () => {
      const action = new EmployeeAddAndSendInvitationSuccess(undefined);

      turnOffPendingCase(action);
    });
  });

  describe("getPendingState selector", () => {
    function getPendingStateCase(pending) {
      const state: IState = {
        pending,
      };
      expect(getPendingState(state)).toEqual(pending);
    }

    it("should return true when pending is true", () => {
      getPendingStateCase(true);
    });

    it("should return false when pending is false", () => {
      getPendingStateCase(false);
    });
  });
});
