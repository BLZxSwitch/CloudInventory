export function getMonthTranslationKey(month: number) {
  return month >= 1 && month <= 12
    ? `COMMON.MONTHS.${month}`
    : undefined;
}
