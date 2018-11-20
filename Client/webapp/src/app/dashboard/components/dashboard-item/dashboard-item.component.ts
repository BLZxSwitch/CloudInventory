import { Component, Input } from "@angular/core";

@Component({
  selector: "pr-dashboard-item",
  templateUrl: "./dashboard-item.component.html",
  styleUrls: ["./dashboard-item.component.scss"]
})
export class DashboardItemComponent {

  @Input() public translationKey: string;

  @Input() public url: string;
}
