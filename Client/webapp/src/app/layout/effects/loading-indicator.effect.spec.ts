import { Actions } from "@ngrx/effects";
import { Action } from "@ngrx/store";
import { cold } from "jasmine-marbles";
import { createInjector, get, resolve } from "../../../unit-tests.components/mocks/createInjector";
import { HttpFinalized, HttpStarted } from "../../core/actions/htpp-loading-indicator.actions";
import { LoadingIndicatorHide, LoadingIndicatorShow } from "../actions/loading-indicator.actions";
import { LoadingIndicatorService } from "../services/loading-indicator.service";
import { LoadingIndicatorEffects } from "./loading-indicator.effects";

describe("Loading indicator effect", () => {

  beforeEach(() => {
    createInjector(LoadingIndicatorEffects);
  });

  it("Should be resolved", () => {
    const actual = get<LoadingIndicatorEffects>();
    expect(actual).toEqual(jasmine.any(LoadingIndicatorEffects));
  });

  it("Returns show action", () => {

    const actions$ = cold("a", {a: new HttpStarted()});

    resolve<Actions>(Actions)
      .setup(instance => instance.pipe)
      .returns(actions$.pipe.bind(actions$));

    resolve<LoadingIndicatorService>(LoadingIndicatorService)
      .setup(instance => instance.isLoading())
      .returns(cold("-a|", {a: true}));

    const effect = get<LoadingIndicatorEffects>();

    const expected = new LoadingIndicatorShow();
    expect(effect.effect$()).toBeObservable(cold("-a", {a: expected}));
  });

  it("Returns hide action", () => {

    const actions$ = cold("b",
    {
      b: new HttpFinalized()
    });

    resolve<Actions>(Actions)
      .setup(instance => instance.pipe)
      .returns(actions$.pipe.bind(actions$));

    resolve<LoadingIndicatorService>(LoadingIndicatorService)
      .setup(instance => instance.isLoading())
      .returns(cold("-a|", {a: false}));

    const effect = get<LoadingIndicatorEffects>();

    const expected = new LoadingIndicatorHide();
    expect(effect.effect$()).toBeObservable(cold("-a", {a: expected}));
  });

  it("Ignores other actions", () => {
    class TestAction implements Action {
      public type: string;
    }

    const testAction = new TestAction();

    const actions$ = cold("a", {a: testAction});

    resolve<Actions>(Actions)
      .setup(instance => instance.pipe)
      .returns(actions$.pipe.bind(actions$));

    const effect = get<LoadingIndicatorEffects>();

    expect(effect.effect$()).toBeObservable(cold(""));
  });
});
