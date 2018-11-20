import { ChangeDetectionStrategy, Component, Input } from "@angular/core";
import { NavItem } from "../nav-group/nav-group.component";

@Component({
  selector: "pr-nav-item",
  templateUrl: "./nav-item.component.html",
  styleUrls: ["./nav-item.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavItemComponent {
  @Input() public item: NavItem;
}
