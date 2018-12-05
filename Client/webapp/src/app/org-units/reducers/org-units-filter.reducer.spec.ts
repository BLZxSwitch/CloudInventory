import { OrgUnitsFilterChanged } from "../actions/org-units-filter.actions";
import * as fromOrgUnitFilter from "./org-units-filter.reducer";

describe("Org units filter reducer:", () => {
  it("Returns default state", () => {
    const actual = fromOrgUnitFilter.reducer(undefined, {} as any);

    const expected = {
      name: undefined,
    };
    expect(actual).toEqual(expected);
  });

  it("Returns updated state on OrgUnitsFilterChanged action", () => {
    const name = "name";
    const action = new OrgUnitsFilterChanged({name});
    const actual = fromOrgUnitFilter.reducer(undefined, action);

    const expected = {
      name
    };
    expect(actual).toEqual(expected);
  });
});
