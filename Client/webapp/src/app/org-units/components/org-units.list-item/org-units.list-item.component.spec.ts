import { createInjector, get } from "../../../../unit-tests.components/mocks/createInjector";
import { OrgUnitsListItemComponent } from "./org-units.list-item.component";

describe("Org unit view component", () => {

  beforeEach(() => {
    createInjector(OrgUnitsListItemComponent);
  });

  it("Should be resolved", () => {
    const actual = get<OrgUnitsListItemComponent>();
    expect(actual).toEqual(jasmine.any(OrgUnitsListItemComponent));
  });
});
