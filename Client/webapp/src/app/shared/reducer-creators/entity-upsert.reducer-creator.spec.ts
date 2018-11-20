import { EmployeeDialogClosed, EmployeeEdit, StaffActionTypes } from "../../staff.module/actions/staff.actions";
import { createEntityUpsertReducer, getEditingEntityId, initialState, IState } from "./entity-upsert.reducer-creator";

describe("createBasicPageReducer", () => {

  let entityUpsertReducer;

  beforeEach(() => {
    entityUpsertReducer = createEntityUpsertReducer([StaffActionTypes.EmployeeEdit],
      StaffActionTypes.EmployeeAdd,
      StaffActionTypes.EmployeeDialogClosed,
      action => action.payload.employeeId);
  });

  describe("unknown action", () => {
    it("should return the initial state", () => {
      const action = {} as any;

      const result = entityUpsertReducer(initialState, action);

      expect(result).toBe(initialState);
    });
  });

  describe("EmployeeEdit action", () => {
    it("should set editingEntityId", () => {
      const action = new EmployeeEdit({employeeId: "1"});

      const result = entityUpsertReducer(initialState, action);

      expect(result).toEqual({
        editingEntityId: "1"
      });
    });
  });

  function eraseEditingEmployeeIdCase(action) {
    const result = entityUpsertReducer({editingEntityId: "1"}, action);

    expect(result).toEqual({
      editingEntityId: undefined
    });
  }

  describe("EmployeeDialogClosed action", () => {
    it("should erase editingEntityId", () => {
      const action = new EmployeeDialogClosed();

      eraseEditingEmployeeIdCase(action);
    });
  });

  describe("EmployeeAdd action", () => {
    it("should erase editingEntityId", () => {
      const action = new EmployeeDialogClosed();

      eraseEditingEmployeeIdCase(action);
    });
  });

  describe("getEditingEntityId selector", () => {
    function getEditingEmployeeIdCase(editingEntityId) {
      const state: IState = {
        editingEntityId
      };
      expect(getEditingEntityId(state)).toEqual(editingEntityId);
    }

    it("should return correct value when editingEntityId is set", () => {
      getEditingEmployeeIdCase("SOME_ID");
    });

    it("should return undefined when editingEntityId is undefined", () => {
      getEditingEmployeeIdCase(undefined);
    });
  });
});
