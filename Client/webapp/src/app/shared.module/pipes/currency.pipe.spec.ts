import { createInjector, get, resolve } from "../../../unit-tests.components/mocks/createInjector";
import { IntlNumberFormattingProvider } from "../../core/services/intl-number-formatting.provider";
import { CurrencyPipe } from "./currency.pipe";

describe("CurrencyPipe", () => {
  beforeEach(() => {
    createInjector(CurrencyPipe);
  });

  it("create an instance", () => {
    const pipe = get<CurrencyPipe>();
    expect(pipe).toBeTruthy();
  });

  it("returns value", () => {
    resolve<IntlNumberFormattingProvider>(IntlNumberFormattingProvider)
      .setup(instance => instance.formatCurrency(123))
      .returns("CHF 123.00");

    const pipe = get<CurrencyPipe>();
    expect(pipe.transform(123)).toEqual("CHF 123.00");
  });
});
