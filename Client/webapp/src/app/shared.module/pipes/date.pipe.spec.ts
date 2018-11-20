import { utc } from "moment";
import { It } from "moq.ts";
import { createInjector, get, resolve } from "../../../unit-tests.components/mocks/createInjector";
import { IntlDateFormattingProvider } from "../../core/services/intl-date-formatting.provider";
import { DatePipe } from "./date.pipe";

describe("DatePipe", () => {
  beforeEach(() => {
    createInjector(DatePipe);
  });

  it("create an instance", () => {
    const pipe = get<DatePipe>();
    expect(pipe).toBeTruthy();
  });

  it("returns value from string", () => {
    const date = utc([2018, 9, 20]);
    resolve<IntlDateFormattingProvider>(IntlDateFormattingProvider)
      .setup(instance => instance.format(It.Is(value => value.valueOf() === date.valueOf())))
      .returns("20.10.2018");
    const pipe = get<DatePipe>();
    expect(pipe.transform("2018-10-20")).toEqual("20.10.2018");
  });

  it("returns value from date", () => {
    const date = utc([2018, 9, 20]);
    resolve<IntlDateFormattingProvider>(IntlDateFormattingProvider)
      .setup(instance => instance.format(It.Is(value => value.valueOf() === date.valueOf())))
      .returns("20.10.2018");
    const pipe = get<DatePipe>();
    expect(pipe.transform(utc([2018, 9, 20]).valueOf())).toEqual("20.10.2018");
  });
});
