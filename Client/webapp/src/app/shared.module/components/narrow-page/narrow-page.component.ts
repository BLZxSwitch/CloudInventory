import { ChangeDetectionStrategy, Component, Input } from "@angular/core";

@Component({
  selector: "pr-narrow-page",
  templateUrl: "./narrow-page.component.html",
  styleUrls: ["./narrow-page.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NarrowPageComponent {

  @Input() public header: string;

  @Input() public expanded: boolean;
}
