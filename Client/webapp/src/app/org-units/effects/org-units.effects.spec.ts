import { cold, hot } from "jasmine-marbles";
import { createInjectorWithActionsAndStore, TestActions } from "../../../unit-tests.components/mocks/actions";
import { get } from "../../../unit-tests.components/mocks/createInjector";
import { OrgUnitRequestDTO } from "../../core/services/service-proxies";
import { OrgUnitAddRequest, OrgUnitEditRequest } from "../../data/actions/org-units.collection.actions";
import { OrgUnitSubmit } from "../actions/org-units.actions";
import { OrgUnitsEffects } from "./org-units.effects";

describe("OrgUnitsEffects", () => {

  let actions$: TestActions;

  beforeEach(() => {
    actions$ = createInjectorWithActionsAndStore(OrgUnitsEffects);
  });

  describe("upsertOrgUnit$", () => {
    it("should return a OrgUnitEditRequest on OrgUnitSubmit when id is defined", () => {
      const orgUnit = new OrgUnitRequestDTO();
      orgUnit.id = "id";
      orgUnit.name = "name";
      orgUnit.molStartDate = undefined;

      const effects = get<OrgUnitsEffects>();

      const completion = new OrgUnitEditRequest({orgUnit});

      actions$.stream = hot("-a", {
          a: new OrgUnitSubmit({orgUnit})
        }
      );
      const expected = cold("-b", {b: completion});

      expect(effects.upsertOrgUnit$).toBeObservable(expected);
    });

    it("should return a OrgUnitAddRequest on OrgUnitSubmit when id is undefined", () => {
      const orgUnit = new OrgUnitRequestDTO();
      orgUnit.id = undefined;
      orgUnit.name = "name";
      orgUnit.molStartDate = undefined;

      const effects = get<OrgUnitsEffects>();
      const completion = new OrgUnitAddRequest({orgUnit});

      actions$.stream = hot("-a", {
          a: new OrgUnitSubmit({orgUnit})
        }
      );
      const expected = cold("-b", {b: completion});

      expect(effects.upsertOrgUnit$).toBeObservable(expected);
    });
  });
});
