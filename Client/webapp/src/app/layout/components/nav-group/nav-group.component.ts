import { ChangeDetectionStrategy, Component, Input } from "@angular/core";

export class NavItem {
  constructor(
    public routerLink: string[],
    public translationKey: string,
    public icon: string) {
  }
}

@Component({
  selector: "pr-nav-group",
  templateUrl: "./nav-group.component.html",
  styleUrls: ["./nav-group.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavGroupComponent {

  @Input() public header: string;

  @Input() public items: NavItem[];

  public trackByFn(index) {
    return index;
  }
}
