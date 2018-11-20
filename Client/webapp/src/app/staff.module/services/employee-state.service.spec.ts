import {createInjector, get} from "../../../unit-tests.components/mocks/createInjector";
import {EmployeeDTO} from "../../core/services/service-proxies";
import {EmployeeState} from "../components/employee-state/employee-state";

import {EmployeeStateService} from "./employee-state.service";

describe("EmployeeStateService", () => {
  beforeEach(() => {
    createInjector(EmployeeStateService);
  });

  it("Should be resolved", () => {
    const actual = get<EmployeeStateService>();
    expect(actual).toEqual(jasmine.any(EmployeeStateService));
  });

  it("Returns isDisabled state", () => {
    const employee = {
      isActive: false
    } as EmployeeDTO;

    const service = get<EmployeeStateService>();
    const actual = service.Get(employee);

    expect(actual).toEqual(EmployeeState.IsDisabled);
  });

  it("Returns isActive state", () => {
    const employee = {
      isActive: true,
      isInvitationAccepted: true
    } as EmployeeDTO;

    const service = get<EmployeeStateService>();
    const actual = service.Get(employee);

    expect(actual).toEqual(EmployeeState.IsActive);
  });

  it("Returns IsNotInvited state", () => {
    const employee = {
      isActive: true,
      isInvited: false,
      isInvitationAccepted: false
    } as EmployeeDTO;

    const service = get<EmployeeStateService>();
    const actual = service.Get(employee);

    expect(actual).toEqual(EmployeeState.IsNotInvited);
  });

  it("Returns IsInvited state", () => {
    const employee = {
      isActive: true,
      isInvited: true,
      isInvitationAccepted: false
    } as EmployeeDTO;

    const service = get<EmployeeStateService>();
    const actual = service.Get(employee);

    expect(actual).toEqual(EmployeeState.IsInvited);
  });
});
