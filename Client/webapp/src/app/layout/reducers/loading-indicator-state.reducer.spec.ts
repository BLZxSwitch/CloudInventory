import { LoadingIndicatorHide, LoadingIndicatorShow } from "./../actions/loading-indicator.actions";
import { loadingIndicatorStateReducer } from "./loading-indicator-state.reducer";

describe("Loading indicator Reducer", () => {
  describe("unknown action", () => {
    it("should return the initial state", () => {
      const action = {} as any;
      const initialState = false;

      const result = loadingIndicatorStateReducer(initialState, action);

      expect(result).toEqual(initialState);
    });
  });

  it("Returns true for show action", () => {
    const action = new LoadingIndicatorShow();

    const result = loadingIndicatorStateReducer(false, action);

    expect(result).toEqual(true);
  });

  it("Returns false for hide action", () => {
    const action = new LoadingIndicatorHide();

    const result = loadingIndicatorStateReducer(true, action);

    expect(result).toEqual(false);
  });
});
