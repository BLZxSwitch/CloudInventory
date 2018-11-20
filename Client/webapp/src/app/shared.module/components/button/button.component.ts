import { Component, Input } from "@angular/core";
import { select, Store } from "@ngrx/store";
import * as fromRoot from "../../../reducers";

@Component({
  selector: "pr-button",
  templateUrl: "./button.component.html",
  styleUrls: ["./button.component.scss"]
})
export class ButtonComponent {

  public showSidenav$ = this.store.pipe(select(fromRoot.getShowSidenav));

  @Input() public icon: string;

  @Input() public color: string;

  @Input() public disabled: boolean;

  public constructor(private store: Store<fromRoot.IState>) {
  }
}
