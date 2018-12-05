import { Store } from "@ngrx/store";
import { cold } from "jasmine-marbles";
import { It } from "moq.ts";
import { createInjector, get, resolve } from "../../../../unit-tests.components/mocks/createInjector";
import { Is } from "../../../../unit-tests.components/moq/equal";
import { OrgUnitsFilterChanged } from "../../actions/org-units-filter.actions";
import { IOrgUnitsStore } from "../../reducers";
import { OrgUnitsFilterContainer } from "./org-units.filter.container";

describe("Org units filter container", () => {

  beforeEach(() => {
    createInjector(OrgUnitsFilterContainer);
  });

  it("Should be resolved", () => {
    const actual = get<OrgUnitsFilterContainer>();
    expect(actual).toEqual(jasmine.any(OrgUnitsFilterContainer));
  });

  it("Exposes filter state", () => {
    const filter$ = cold("a|", {a: "name"});

    resolve<Store<IOrgUnitsStore>>(Store)
      .setup(instance => instance.pipe(It.IsAny(), It.IsAny()))
      .returns(filter$);

    const component = get<OrgUnitsFilterContainer>();
    const actual = component.filter$;

    expect(actual).toBe(filter$);
  });

  it("Dispatches the action when filter has been changed", () => {
    const name = "filter";

    const component = get<OrgUnitsFilterContainer>();
    component.onChange(name);

    const action = new OrgUnitsFilterChanged({name});
    resolve<Store<IOrgUnitsStore>>(Store)
      .verify(instance => instance.dispatch(Is.Eq(action)));
  });
});
