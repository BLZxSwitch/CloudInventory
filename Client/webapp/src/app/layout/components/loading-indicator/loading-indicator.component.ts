import { ChangeDetectionStrategy, Component, Input } from "@angular/core";

@Component({
  selector: "pr-loading-indicator",
  templateUrl: "./loading-indicator.component.html",
  styleUrls: ["./loading-indicator.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoadingIndicatorComponent {

  @Input() public isVisible: boolean;
  @Input() public mobile: boolean;

  get sidenavIsVisible(): boolean {
    return this._sidenavIsVisible;
  }

  @Input() set sidenavIsVisible(value: boolean) {
    // disable transition for initial set
    if (this.transition === undefined) {
      this.transition = false;
    } else {
      if (!this.transition && this._sidenavIsVisible !== value) {
        this.transition = true;
      }
    }

    this._sidenavIsVisible = value;
  }

  public transition: boolean = undefined;

  private _sidenavIsVisible = false;

}
