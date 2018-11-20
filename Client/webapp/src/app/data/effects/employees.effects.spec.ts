import { cold, hot } from "jasmine-marbles";
import { createInjectorWithActions, createInjectorWithActionsAndStore, TestActions } from "../../../unit-tests.components/mocks/actions";
import { get, resolve } from "../../../unit-tests.components/mocks/createInjector";
import * as fromAuth from "../../auth/reducers";
import { EmployeeDTO, EmployeesServiceProxy, InvitationServiceProxy } from "../../core/services/service-proxies";
import {
  EmployeeAddAndSendInvitationSuccess,
  EmployeeAddFailure,
  EmployeeAddRequest,
  EmployeeAddSuccess,
  EmployeeDeleteFailure,
  EmployeeDeleteRequest,
  EmployeeDeleteSuccess,
  EmployeeEditFailure,
  EmployeeEditRequest,
  EmployeeEditSuccess,
  EmployeeInviteAfterAddRequest,
  EmployeeSendInvitationFailure,
  EmployeeSendInvitationRequest,
  EmployeeSendInvitationSuccess,
  EmployeesLoad,
  EmployeesLoadFailure,
  EmployeesLoadSuccess
} from "../actions/employees.actions";
import { EmployeesEffects } from "./employees.effects";

describe("EmployeesEffects", () => {

  let actions$: TestActions;

  beforeEach(() => {
    actions$ = createInjectorWithActionsAndStore(EmployeesEffects);
  });

  describe("employeesLoad$", () => {
    it("should call getAll and return a EmployeesLoadSuccess on success", () => {
      spyOn(fromAuth, "isAdmin").and.returnValue(true);

      const effects = get<EmployeesEffects>();
      const employees = [new EmployeeDTO()];

      const action = new EmployeesLoad();
      const completion = new EmployeesLoadSuccess({employees});

      actions$.stream = hot("-a", {a: action});
      const response = cold("-b", {b: employees});
      const expected = cold("--c", {c: completion});

      resolve<EmployeesServiceProxy>(EmployeesServiceProxy)
        .setup(instance => instance.getAll())
        .returns(response);

      expect(effects.employeesLoad$).toBeObservable(expected);
    });

    it("should call getListOfSubordinates and return a EmployeesLoadSuccess on success", () => {
      spyOn(fromAuth, "isAdmin").and.returnValue(false);

      const effects = get<EmployeesEffects>();
      const employees = [new EmployeeDTO()];

      const action = new EmployeesLoad();
      const completion = new EmployeesLoadSuccess({employees});

      actions$.stream = hot("-a", {a: action});
      const response = cold("-b", {b: employees});
      const expected = cold("--c", {c: completion});

      resolve<EmployeesServiceProxy>(EmployeesServiceProxy)
        .setup(instance => instance.getListOfSubordinates())
        .returns(response);

      expect(effects.employeesLoad$).toBeObservable(expected);
    });

    it("should return a EmployeesLoadFailure on server error", () => {
      spyOn(fromAuth, "isAdmin").and.returnValue(true);
      const effects = get<EmployeesEffects>();

      const action = new EmployeesLoad();
      const error = "Error!";
      const completion = new EmployeesLoadFailure(error);

      actions$.stream = hot("-a", {a: action});
      const response = cold("-#", {}, error);
      const expected = cold("--c", {c: completion});

      resolve<EmployeesServiceProxy>(EmployeesServiceProxy)
        .setup(instance => instance.getAll())
        .returns(response);

      expect(effects.employeesLoad$).toBeObservable(expected);
    });

    it("should return a EmployeesLoadFailure on server error", () => {
      spyOn(fromAuth, "isAdmin").and.returnValue(false);
      const effects = get<EmployeesEffects>();

      const action = new EmployeesLoad();
      const error = "Error!";
      const completion = new EmployeesLoadFailure(error);

      actions$.stream = hot("-a", {a: action});
      const response = cold("-#", {}, error);
      const expected = cold("--c", {c: completion});

      resolve<EmployeesServiceProxy>(EmployeesServiceProxy)
        .setup(instance => instance.getListOfSubordinates())
        .returns(response);

      expect(effects.employeesLoad$).toBeObservable(expected);
    });
  });

  describe("editEmployee$", () => {
    it("should return a EmployeeEditRequest on success", () => {

      const effects = get<EmployeesEffects>();
      const employee1 = new EmployeeDTO();
      const employee2 = new EmployeeDTO();

      const action = new EmployeeEditRequest({employee: employee1});
      const completion = new EmployeeEditSuccess({employee: employee2});

      actions$.stream = hot("-a", {a: action});
      const response = cold("-b", {b: employee2});
      const expected = cold("--c", {c: completion});

      resolve<EmployeesServiceProxy>(EmployeesServiceProxy)
        .setup(instance => instance.update(employee1))
        .returns(response);

      expect(effects.editEmployee$).toBeObservable(expected);
    });

    it("should return a EmployeeEditFailure on server error", () => {
      const effects = get<EmployeesEffects>();
      const employee1 = new EmployeeDTO();

      const action = new EmployeeEditRequest({employee: employee1});
      const error = "Error!";
      const completion = new EmployeeEditFailure(error);

      actions$.stream = hot("-a", {a: action});
      const response = cold("-#", {}, error);
      const expected = cold("--c", {c: completion});

      resolve<EmployeesServiceProxy>(EmployeesServiceProxy)
        .setup(instance => instance.update(employee1))
        .returns(response);

      expect(effects.editEmployee$).toBeObservable(expected);
    });
  });

  describe("addEmployee$", () => {
    it("should return a EmployeeAddRequest on success if invite = false", () => {

      const effects = get<EmployeesEffects>();
      const employee1 = new EmployeeDTO();
      const employee2 = new EmployeeDTO();

      const action = new EmployeeAddRequest({employee: employee1, invite: false});
      const completion = new EmployeeAddSuccess({employee: employee2});

      actions$.stream = hot("-a", {a: action});
      const response = cold("-b", {b: employee2});
      const expected = cold("--c", {c: completion});

      resolve<EmployeesServiceProxy>(EmployeesServiceProxy)
        .setup(instance => instance.add(employee1))
        .returns(response);

      expect(effects.addEmployee$).toBeObservable(expected);
    });

    it("should return a EmployeeInviteAfterAddRequest on success if invite = true", () => {

      const effects = get<EmployeesEffects>();
      const employee1 = new EmployeeDTO();
      const employee2 = new EmployeeDTO();

      const action = new EmployeeAddRequest({employee: employee1, invite: true});
      const completion = new EmployeeInviteAfterAddRequest({employee: employee2});

      actions$.stream = hot("-a", {a: action});
      const response = cold("-b", {b: employee2});
      const expected = cold("--c", {c: completion});

      resolve<EmployeesServiceProxy>(EmployeesServiceProxy)
        .setup(instance => instance.add(employee1))
        .returns(response);

      expect(effects.addEmployee$).toBeObservable(expected);
    });

    it("should return a EmployeeAddFailure on server error", () => {
      const effects = get<EmployeesEffects>();
      const employee1 = new EmployeeDTO();

      const action = new EmployeeAddRequest({employee: employee1, invite: false});
      const error = "Error!";
      const completion = new EmployeeAddFailure(error);

      actions$.stream = hot("-a", {a: action});
      const response = cold("-#", {}, error);
      const expected = cold("--c", {c: completion});

      resolve<EmployeesServiceProxy>(EmployeesServiceProxy)
        .setup(instance => instance.add(employee1))
        .returns(response);

      expect(effects.addEmployee$).toBeObservable(expected);
    });
  });

  describe("sendInvitation$", () => {
    it("should return a EmployeeSendInvitationSuccess on success", () => {

      const effects = get<EmployeesEffects>();
      const employee1 = new EmployeeDTO();
      const employee2 = new EmployeeDTO();
      employee1.id = "id";
      employee2.id = "id";
      employee1.isInvited = false;
      employee2.isInvited = true;

      const action = new EmployeeSendInvitationRequest({employee: employee1});
      const completion = new EmployeeSendInvitationSuccess({employee: {...employee1, isInvited: true}});

      actions$.stream = hot("-a", {a: action});
      const response = cold("-b", {b: employee2});
      const expected = cold("--c", {c: completion});

      resolve<InvitationServiceProxy>(InvitationServiceProxy)
        .setup(instance => instance.sendInvitation(employee1.id))
        .returns(response);

      expect(effects.sendInvitation$).toBeObservable(expected);
    });

    it("should return a EmployeeSendInvitationFailure on server error", () => {
      const effects = get<EmployeesEffects>();
      const employee1 = new EmployeeDTO();
      employee1.id = "id";

      const action = new EmployeeSendInvitationRequest({employee: employee1});
      const error = "Error!";
      const completion = new EmployeeSendInvitationFailure(error);

      actions$.stream = hot("-a", {a: action});
      const response = cold("-#", {}, error);
      const expected = cold("--c", {c: completion});

      resolve<InvitationServiceProxy>(InvitationServiceProxy)
        .setup(instance => instance.sendInvitation(employee1.id))
        .returns(response);

      expect(effects.sendInvitation$).toBeObservable(expected);
    });
  });

  describe("sendInvitationAfterSave$", () => {
    it("should return a EmployeeAddAndSendInvitationSuccess on success", () => {

      const effects = get<EmployeesEffects>();
      const employee1 = new EmployeeDTO();
      const employee2 = new EmployeeDTO();
      employee1.id = "id";
      employee2.id = "id";
      employee1.isInvited = false;
      employee2.isInvited = true;

      const action = new EmployeeInviteAfterAddRequest({employee: employee1});
      const completion = new EmployeeAddAndSendInvitationSuccess({employee: {...employee1, isInvited: true}});

      actions$.stream = hot("-a", {a: action});
      const response = cold("-b", {b: employee2});
      const expected = cold("--c", {c: completion});

      resolve<InvitationServiceProxy>(InvitationServiceProxy)
        .setup(instance => instance.sendInvitation(employee1.id))
        .returns(response);

      expect(effects.sendInvitationAfterSave$).toBeObservable(expected);
    });

    it("should return a EmployeeSendInvitationFailure on server error", () => {
      const effects = get<EmployeesEffects>();
      const employee1 = new EmployeeDTO();
      employee1.id = "id";

      const action = new EmployeeInviteAfterAddRequest({employee: employee1});
      const error = "Error!";
      const completion = new EmployeeSendInvitationFailure(error);

      actions$.stream = hot("-a", {a: action});
      const response = cold("-#", {}, error);
      const expected = cold("--c", {c: completion});

      resolve<InvitationServiceProxy>(InvitationServiceProxy)
        .setup(instance => instance.sendInvitation(employee1.id))
        .returns(response);

      expect(effects.sendInvitationAfterSave$).toBeObservable(expected);
    });
  });

  describe("deleteEmployee$", () => {
    it("should return a EmployeeDeleteSuccess on success", () => {

      const effects = get<EmployeesEffects>();
      const employeeId = "employeeId";

      const action = new EmployeeDeleteRequest({employeeId});
      const completion = new EmployeeDeleteSuccess({employeeId});

      actions$.stream = hot("-a", {a: action});
      const response = cold("-b");
      const expected = cold("--c", {c: completion});

      resolve<EmployeesServiceProxy>(EmployeesServiceProxy)
        .setup(instance => instance.delete(employeeId))
        .returns(response);

      expect(effects.deleteEmployee$).toBeObservable(expected);
    });

    it("should return a EmployeeDeleteFailure on server error", () => {
      const effects = get<EmployeesEffects>();
      const employeeId = "employeeId";

      const action = new EmployeeDeleteRequest({employeeId});
      const error = "Error!";
      const completion = new EmployeeDeleteFailure(error);

      actions$.stream = hot("-a", {a: action});
      const response = cold("-#", {}, error);
      const expected = cold("--c", {c: completion});

      resolve<EmployeesServiceProxy>(EmployeesServiceProxy)
        .setup(instance => instance.delete(employeeId))
        .returns(response);

      expect(effects.deleteEmployee$).toBeObservable(expected);
    });
  });
});
