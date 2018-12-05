import { cold, getTestScheduler } from "jasmine-marbles";
import { createInjector, get } from "../../../unit-tests.components/mocks/createInjector";
import { RXJS_SCHEDULER } from "../../shared/InjectionTokens/rsjx-scheduler.injection-token";
import { AutoSubmitPipeBehavior } from "./auto-submit.pipe-behavior";

describe("Auto submit pipe behavior", () => {

  const debounceTime = "-".repeat(40);

  beforeEach(() => {
    const scheduler = getTestScheduler();
    scheduler.maxFrames = 2000;
    createInjector(AutoSubmitPipeBehavior, [
      {provide: RXJS_SCHEDULER, useValue: scheduler}
    ]);
  });

  it("Should be resolved", () => {
    const actual = get<AutoSubmitPipeBehavior>();
    expect(actual).toEqual(jasmine.any(AutoSubmitPipeBehavior));
  });

  it("Passes the unique values in 400ms", () => {
    const first = {value: "first"};
    const second = {value: "second"};
    const form$ = cold(`a${debounceTime}b`, {a: first, b: second});

    const behavior = get<AutoSubmitPipeBehavior>();
    const operator = behavior.get(v => v.value);

    const expected = cold(`${debounceTime}a${debounceTime}b`, {a: first, b: second});
    expect(form$.pipe(operator)).toBeObservable(expected);
  });

  it("Ignores values within 400ms", () => {
    const first = {value: "first"};
    const second = {value: "second"};
    const form$ = cold(`a-b-a`, {a: first, b: second});

    const behavior = get<AutoSubmitPipeBehavior>();
    const operator = behavior.get(v => v.value);

    const expected = cold(`----${debounceTime}a`, {a: first});
    expect(form$.pipe(operator)).toBeObservable(expected);
  });

  it("Ignores unchanged value", () => {
    const first = {value: "first"};
    const second = {value: "second"};
    const form$ = cold(`a${debounceTime}b-a`, {a: first, b: second});

    const behavior = get<AutoSubmitPipeBehavior>();
    const operator = behavior.get(v => v.value);

    const expected = cold(`${debounceTime}a`, {a: first});
    expect(form$.pipe(operator)).toBeObservable(expected);
  });
});
