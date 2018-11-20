import * as equal from "fast-deep-equal";
import * as moment from "moment";
import { IPredicate, It } from "moq.ts";

export class Is<T> extends It<T> {
  public static Eq<T>(expected: T): T {
    const predicate = Is.predicateFactory(expected);
    return new It<T>(predicate) as any;
  }

  private static predicateFactory<T>(expected: T): IPredicate<T> {
    if (expected instanceof moment) {
      return actual => expected.valueOf() === actual.valueOf();
    }
    return actual => equal(expected, actual);
  }
}
