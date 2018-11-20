import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  ViewChild
} from "@angular/core";
import { ScrollService } from "../../../core/services/scroll.service";
import { LoadingIndicatorService } from "../../services/loading-indicator.service";
import { NavMenuComponent } from "../nav-menu/nav-menu.component";

@Component({
  selector: "pr-sidenav-layout",
  templateUrl: "./sidenav-layout.component.html",
  styleUrls: ["./sidenav-layout.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SidenavLayoutComponent {

  @ViewChild("sidenav", {read: ElementRef}) public sidenav: ElementRef;
  @ViewChild(NavMenuComponent) public navMenuComponent: NavMenuComponent;

  @Input() public showSidenav: boolean;

  @Input() public mobile: boolean;

  @Output() public sidenavOpen = new EventEmitter();

  @Output() public sidenavClose = new EventEmitter();

  @Output() public entityAdd = new EventEmitter();

  public scrolled$ = this.scrollService.isNotDefaultScrollPosition$;
  public loadingIndicatorIsVisible$ = this.loadingIndicatorService.isVisible();

  constructor(
    private scrollService: ScrollService,
    private loadingIndicatorService: LoadingIndicatorService) {
  }

  public onHamburgerClick() {
    this.sidenavOpen.emit();
  }

  public onSidenavClose() {
    this.sidenavClose.emit();
  }

  public onAddButtonClick() {
    this.entityAdd.emit();
  }
}
