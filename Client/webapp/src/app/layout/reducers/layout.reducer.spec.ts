import { SidenavClose, SidenavOpen } from "../actions/layout.actions";
import { initialState, reducer } from "./layout.reducer";

describe("Layout Reducer", () => {
  describe("unknown action", () => {
    it("should return the initial state", () => {
      const action = {} as any;

      const result = reducer(initialState, action);

      expect(result).toBe(initialState);
    });
  });

  describe("SidenavOpen action", () => {
    it("should set showSidenav to true", () => {
      const action = new SidenavOpen();

      const result = reducer({
        showSidenav: false,
      }, action);

      expect(result).toEqual({
        showSidenav: true,
      });
    });
  });

  describe("SidenavClose action", () => {
    it("should set showSidenav to false", () => {
      const action = new SidenavClose();

      const result = reducer({
        showSidenav: true,
      }, action);

      expect(result).toEqual({
        showSidenav: false,
      });
    });
  });
});
