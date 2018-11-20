import { ChangeDetectionStrategy, Component, EventEmitter, HostBinding, Input, Output } from "@angular/core";
import { Environment } from "../../../core/services/environment";
import { ScrollService } from "../../../core/services/scroll.service";

@Component({
  selector: "pr-toolbar",
  styleUrls: ["toolbar.component.scss"],
  templateUrl: "./toolbar.component.html",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ToolbarComponent {
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

  @HostBinding("class.minimized") @Input() public minimized = false;

  @Input() public showHamburger = false;
  @Input() public mobile = false;
  @Output() public hamburgerClick = new EventEmitter();

  public transition: boolean = undefined;

  public scrolled$ = this.scrollService.isNotDefaultScrollPosition$;

  private _sidenavIsVisible = false;

  constructor(private scrollService: ScrollService,
              public environment: Environment) {
  }

  public onHamburgerClick() {
    this.hamburgerClick.emit();
  }
}
