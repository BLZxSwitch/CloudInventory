import { Store } from "@ngrx/store";
import { cold, getTestScheduler } from "jasmine-marbles";
import { Mock } from "moq.ts";
import { createInjector, get, resolve } from "../../../unit-tests.components/mocks/createInjector";
import { ILoadingIndicatorState } from "../store/loading-indicator.state";
import { ILoadingIndicatorStore } from "../store/loading-indicator.store";
import { LoadingIndicatorService } from "./loading-indicator.service";

describe("Loading indicator service", () => {

  beforeEach(() => {
    createInjector(LoadingIndicatorService);
  });

  it("Returns true when loading counter is not zero", () => {
    const state = new Mock<ILoadingIndicatorState>()
      .setup(instance => instance.loadingCount)
      .returns(1)
      .object();

    const store = new Mock<any>()
      .setup(instance => instance.loadingIndicator)
      .returns(state)
      .object();

    const store$ = cold("-a", {a: store});

    resolve<Store<ILoadingIndicatorStore>>(Store)
      .setup(instance => instance.pipe)
      .returns(store$.pipe.bind(store$));

    const target = get<LoadingIndicatorService>();

    const actual = target.isLoading();
    expect(actual).toBeObservable(cold("-a", {a: true}));
  });

  it("Returns false when loading counter is zero", () => {
    const state = new Mock<ILoadingIndicatorState>()
      .setup(instance => instance.loadingCount)
      .returns(0)
      .object();

    const store = new Mock<any>()
      .setup(instance => instance.loadingIndicator)
      .returns(state)
      .object();

    const store$ = cold("-a", {a: store});

    resolve<Store<ILoadingIndicatorStore>>(Store)
      .setup(instance => instance.pipe)
      .returns(store$.pipe.bind(store$));

    const target = get<LoadingIndicatorService>();

    const actual = target.isLoading();
    expect(actual).toBeObservable(cold("-a", {a: false}));
  });

  it("Returns loading indicator state", done => {
    const state = new Mock<ILoadingIndicatorState>()
      .setup(instance => instance.isVisible)
      .returns(true)
      .object();

    const store = new Mock<any>()
      .setup(instance => instance.loadingIndicator)
      .returns(state)
      .object();

    const store$ = cold("a", {a: store});

    resolve<Store<ILoadingIndicatorStore>>(Store)
      .setup(instance => instance.pipe)
      .returns(store$.pipe.bind(store$));

    const target = get<LoadingIndicatorService>();

    const actual = target.isVisible();
    actual.subscribe(result => {
      expect(result).toBe(true);
      done();
    });
    getTestScheduler().flush();
  });
});
