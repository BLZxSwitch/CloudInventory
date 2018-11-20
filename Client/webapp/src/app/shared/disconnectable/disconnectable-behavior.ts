import { Action } from "@ngrx/store";

export class DisconnectableBehavior {
  private active = true;

  constructor(private func: () => Action) {
  }

  public action(): Action {
    this.disable();
    return this.func();
  }

  public filter() {
    return this.active;
  }

  public disable() {
    this.active = false;
  }

  public reset() {
    this.active = true;
  }
}
