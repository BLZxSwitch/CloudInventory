import { utc } from "moment";
import { createInjector, get, resolve } from "../../../unit-tests.components/mocks/createInjector";
import { InitialMonthProvider } from "./initial-month.provider";
import { NowProvider } from "./now.provider";

describe("Initial month provider", () => {

  beforeEach(() => {
    createInjector(InitialMonthProvider);
  });

  it("Should be resolved", () => {
    const actual = get<InitialMonthProvider>();
    expect(actual).toEqual(jasmine.any(InitialMonthProvider));
  });

  it("Returns current month when it is 11th day", () => {
    const year = 2018;
    const month = 7;
    const today = utc([year, month - 1, 11, 0, 0, 1]);

    resolve<NowProvider>(NowProvider)
      .setup(instance => instance.now())
      .returns(today);

    const provider = get<InitialMonthProvider>();
    const actual = provider.get();

    expect(actual).toEqual({year, month});
  });

  it("Returns previous month when it is less then 11th day", () => {
    const year = 2018;
    const month = 7;
    const today = utc([year, month - 1, 10]);

    resolve<NowProvider>(NowProvider)
      .setup(instance => instance.now())
      .returns(today);

    const provider = get<InitialMonthProvider>();
    const actual = provider.get();

    expect(actual).toEqual({year, month: month - 1});
  });
});
