import { cold } from "jasmine-marbles";
import { Mock } from "moq.ts";
import { DtoMock } from "../../../unit-tests.components/dto-mock";
import { IOrgUnitDTO } from "../../core/services/service-proxies";
import { IDataState } from "../../data/reducers";
import * as fromOrgUnits from "../../data/reducers/org-units-collection.reducer";
import { IOrgUnitsState,  } from "../reducers";
import { orgUnitsFilteredEntitiesSelector } from "./org-units.filtered-entities.selector";

describe("Org units entities selector", () => {

  it("Returns filtered value", () => {
    const name = "name";
    const name1 = "name";
    const name2 = "na";
    const orgUnitId1 = "orgUnitId1";
    const orgUnitId2 = "orgUnitId2";

    const orgUnitDTO1 = new DtoMock<IOrgUnitDTO>()
      .property(instance => instance.id = orgUnitId1)
      .property(instance => instance.name = name1)
      .object();

    const orgUnitDTO2 = new DtoMock<IOrgUnitDTO>()
      .property(instance => instance.id = orgUnitId2)
      .property(instance => instance.name = name2)
      .object();

    const orgUnitEntitiesState = new Mock<fromOrgUnits.IState>()
      .setup(instance => instance.entities)
      .returns({
        [orgUnitId1]: orgUnitDTO1,
        [orgUnitId2]: orgUnitDTO2
      })
      .setup(instance => instance.ids)
      .returns([orgUnitId1, orgUnitId2])
      .object();

    const dataState = new Mock<IDataState>()
      .setup(instance => instance.orgUnits)
      .returns(orgUnitEntitiesState)
      .object();

    const orgUnitsState = new Mock<IOrgUnitsState>()
      .setup(instance => instance.orgUnitsFilter)
      .returns({name})
      .object();

    const store = new Mock<any>()
      .setup(instance => instance.orgUnits)
      .returns(orgUnitsState)
      .setup(instance => instance.data)
      .returns(dataState)
      .object();

    const store$ = cold("-a|", {a: store});

    const actual = store$.pipe(orgUnitsFilteredEntitiesSelector);
    expect(actual).toBeObservable(cold("-a|", {a: [{...orgUnitDTO1}]}));
  });
});
