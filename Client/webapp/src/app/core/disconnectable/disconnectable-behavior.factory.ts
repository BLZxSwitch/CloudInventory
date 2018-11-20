import { Injectable } from "@angular/core";
import { Action } from "@ngrx/store";
import { DisconnectableBehavior } from "../../shared/disconnectable/disconnectable-behavior";

@Injectable()
export class DisconnectableBehaviorFactory {

  public get(action: () => Action): DisconnectableBehavior {
    return new DisconnectableBehavior(action);
  }
}
