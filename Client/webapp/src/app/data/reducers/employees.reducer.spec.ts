import { EmployeeDTO, OrganizationalUnitResponseDTO } from "../../core/services/service-proxies";
import {
  EmployeeAddAndSendInvitationSuccess,
  EmployeeAddSuccess,
  EmployeeEditSuccess,
  EmployeeInviteAfterAddRequest,
  EmployeeSendInvitationSuccess,
  EmployeesLoadSuccess
} from "../actions/employees.actions";
import {
  OrganizationalUnitAddSuccess, OrganizationalUnitDeleteSuccess,
  OrganizationalUnitEditSuccess,
  OrganizationalUnitsLoadSuccess
} from "../actions/organizational-units-collection.actions";
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

  describe("OrganizationalUnitsCollectionActionTypes.OrganizationalUnitAddSuccess action", () => {
    it("should update organizationalUnitId of employee", () => {
      const organizationalUnit = new OrganizationalUnitResponseDTO();
      organizationalUnit.employeeIds = [1, 2] as any;
      organizationalUnit.id = "organizationalUnitId";
      const action = new OrganizationalUnitAddSuccess({organizationalUnit});

      const result = reducer({
        entities: {
          1: new EmployeeDTO({
            id: 1,
          } as any)
        },
        ids: [1]
      }, action);

      expect(JSON.stringify(result)).toEqual(JSON.stringify({
        entities: {
          1: new EmployeeDTO({
            id: 1,
            organizationalUnitId: "organizationalUnitId",
          } as any),
          2: new EmployeeDTO({
            id: 2,
            organizationalUnitId: "organizationalUnitId",
          } as any),
        },
        ids: [1, 2]
      }));
    });
  });

  describe("OrganizationalUnitsCollectionActionTypes.OrganizationalUnitEditSuccess action", () => {
    it("should update organizationalUnitId of employee", () => {
      const organizationalUnit = new OrganizationalUnitResponseDTO();
      organizationalUnit.employeeIds = [1, 2] as any;
      organizationalUnit.id = "organizationalUnitId";
      const action = new OrganizationalUnitEditSuccess({organizationalUnit});

      const result = reducer({
        entities: {
          1: new EmployeeDTO({
            id: 1,
          } as any)
        },
        ids: [1]
      }, action);

      expect(JSON.stringify(result)).toEqual(JSON.stringify({
        entities: {
          1: new EmployeeDTO({
            id: 1,
            organizationalUnitId: "organizationalUnitId",
          } as any),
          2: new EmployeeDTO({
            id: 2,
            organizationalUnitId: "organizationalUnitId",
          } as any),
        },
        ids: [1, 2]
      }));
    });
  });

  describe("OrganizationalUnitsCollectionActionTypes.OrganizationalUnitsLoadSuccess action", () => {
    it("should update organizationalUnitId of employee", () => {
      const organizationalUnit = new OrganizationalUnitResponseDTO();
      organizationalUnit.employeeIds = [1, 2] as any;
      organizationalUnit.id = "organizationalUnitId";
      const action = new OrganizationalUnitsLoadSuccess({organizationalUnits: [organizationalUnit]});

      const result = reducer({
        entities: {
          1: new EmployeeDTO({
            id: 1,
          } as any)
        },
        ids: [1]
      }, action);

      expect(JSON.stringify(result)).toEqual(JSON.stringify({
        entities: {
          1: new EmployeeDTO({
            id: 1,
            organizationalUnitId: "organizationalUnitId",
          } as any),
          2: new EmployeeDTO({
            id: 2,
            organizationalUnitId: "organizationalUnitId",
          } as any),
        },
        ids: [1, 2]
      }));
    });
  });

  describe("OrganizationalUnitsCollectionActionTypes.OrganizationalUnitDeleteSuccess action", () => {
    it("should update organizationalUnitId of employee", () => {
      const organizationalUnitId = "organizationalUnitId1";
      const action = new OrganizationalUnitDeleteSuccess({organizationalUnitId});

      const result = reducer({
        entities: {
          1: new EmployeeDTO({
            id: 1,
            organizationalUnitId: "organizationalUnitId1",
          } as any),
          2: new EmployeeDTO({
            id: 2,
            organizationalUnitId: "organizationalUnitId2",
          } as any),
        },
        ids: [1, 2]
      }, action);

      expect(JSON.stringify(result)).toEqual(JSON.stringify({
        entities: {
          1: new EmployeeDTO({
            id: 1,
            organizationalUnitId: undefined,
          } as any),
          2: new EmployeeDTO({
            id: 2,
            organizationalUnitId: "organizationalUnitId2",
          } as any),
        },
        ids: [1, 2]
      }));
    });
  });
});
