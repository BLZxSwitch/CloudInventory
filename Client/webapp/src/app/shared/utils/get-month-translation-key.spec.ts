import { getMonthTranslationKey } from "./get-month-translation-key";

describe("getMonthTranslationKey", () => {

  it("Returns month text for month", () => {
    const actual = getMonthTranslationKey(1);

    expect(actual).toBe("COMMON.MONTHS.1");
  });

  it("Returns undefined text for non month", () => {
    const actual = getMonthTranslationKey(0);

    expect(actual).toBeUndefined();
  });
});
