import { Component, Input } from "@angular/core";

@Component({
  selector: "pr-more-toggle-button",
  templateUrl: "./more-toggle-button.component.html",
  styleUrls: ["./more-toggle-button.component.scss"]
})
export class MoreToggleButtonComponent {
  @Input() public isExpanded: boolean;
}
