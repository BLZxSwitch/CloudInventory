import { Action } from "@ngrx/store";

export class OrgUnitsFilterChanged implements Action {
  public static readonly type = "[Org Units Filter] Org Units Filter Has Been Changed";
  public readonly type = OrgUnitsFilterChanged.type;

  constructor(public payload: {
    name: string;
  }) {
  }
}
