import { ChangeDetectionStrategy, Component, HostBinding, Input } from "@angular/core";

@Component({
  selector: "pr-backdrop",
  templateUrl: "./backdrop.component.html",
  styleUrls: ["./backdrop.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BackdropComponent {

  @HostBinding("class.collapsed") @Input() public collapsed: boolean;

  @HostBinding("class.transition-height") @Input() public transition = true;

  @HostBinding("class.blur") @Input() public blur = false;

  @HostBinding("class.transition-filter")
  public get transitionFilter() {
    return this.blur;
  }
}
