import { Component, Input } from "@angular/core";

@Component({
  selector: "pr-approved-indicator",
  templateUrl: "./approved-indicator.component.html",
  styleUrls: ["./approved-indicator.component.scss"]
})
export class ApprovedIndicatorComponent {
  @Input() public approved: boolean;

  @Input() public declined: boolean;
}
