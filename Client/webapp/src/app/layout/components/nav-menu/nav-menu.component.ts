import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from "@angular/core";

@Component({
  selector: "pr-nav-menu",
  templateUrl: "./nav-menu.component.html",
  styleUrls: ["./nav-menu.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavMenuComponent {

  @Input() public navGroups;

  @Input() public currentUserFullName: string;

  @Output() public logout = new EventEmitter();

  @Output() public back = new EventEmitter();

  public onLogoutClick() {
    this.logout.emit();
  }

  public trackByFn(index) {
    return index;
  }

  public onBackButtonClick() {
    this.back.emit();
  }
}
