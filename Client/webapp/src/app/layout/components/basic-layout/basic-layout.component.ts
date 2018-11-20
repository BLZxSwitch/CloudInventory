import { ChangeDetectionStrategy, Component } from "@angular/core";
import { ScrollService } from "../../../core/services/scroll.service";

@Component({
  selector: "pr-basic-layout",
  templateUrl: "./basic-layout.component.html",
  styleUrls: ["./basic-layout.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BasicLayoutComponent {

  public scrolled$ = this.scrollService.isNotDefaultScrollPosition$;

  constructor(private scrollService: ScrollService) {
  }
}
