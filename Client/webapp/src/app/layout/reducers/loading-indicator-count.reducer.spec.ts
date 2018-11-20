import { HttpFinalized, HttpStarted } from "../../core/actions/htpp-loading-indicator.actions";
import { loadingIndicatorCountReducer } from "./loading-indicator-count.reducer";

describe("Loading indicator Reducer", () => {
  describe("unknown action", () => {
    it("should return the initial state", () => {
      const action = {} as any;
      const initialState = -1;

      const result = loadingIndicatorCountReducer(initialState, action);

      expect(result).toBe(initialState);
    });
  });

  describe("Http request started action", () => {
    it("should increment loading counter", () => {
      const action = new HttpStarted();

      const result = loadingIndicatorCountReducer(10, action);

      expect(result).toEqual(11);
    });
  });

  describe("Http request finalized action", () => {
    it("should decrement loading counter", () => {
      const action = new HttpFinalized();

      const result = loadingIndicatorCountReducer(10, action);

      expect(result).toEqual(9);
    });
  });
});
