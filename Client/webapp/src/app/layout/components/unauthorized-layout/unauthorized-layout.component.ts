import { ChangeDetectionStrategy, Component } from "@angular/core";
import { ScrollService } from "../../../core/services/scroll.service";
import { LoadingIndicatorService } from "../../services/loading-indicator.service";

@Component({
  selector: "pr-unauthorized-layout",
  templateUrl: "./unauthorized-layout.component.html",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UnauthorizedLayoutComponent {
  public scrolled$ = this.scrollService.isNotDefaultScrollPosition$;
  public loadingIndicatorIsVisible$ = this.loadingIndicatorService.isVisible();

  constructor(private scrollService: ScrollService,
              private loadingIndicatorService: LoadingIndicatorService) {
  }
}
