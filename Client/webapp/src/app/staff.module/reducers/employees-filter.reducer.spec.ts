import { EmployeesFilterChanged } from "../actions/employees-filter.actions";
import * as fromEmployeesFilter from "./employees-filter.reducer";

describe("Employees filter reducer:", () => {
  it("Returns default state", () => {
    const actual = fromEmployeesFilter.reducer(undefined, {} as any);

    const expected = {
      filterPattern: undefined,
    };
    expect(actual).toEqual(expected);
  });

  it("Returns updated state on EmployeesFilterChanged action", () => {
    const filterPattern = "filterPattern";
    const action = new EmployeesFilterChanged({
      filterPattern,
    });
    const actual = fromEmployeesFilter.reducer(undefined, action);

    const expected = {
      filterPattern,
    };
    expect(actual).toEqual(expected);
  });
});
