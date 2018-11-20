import { Component, Input } from "@angular/core";
import { RoutesService } from "../../../core/services/routes.service";

@Component({
  selector: "pr-dashboard-item-list",
  templateUrl: "./dashboard-item-list.component.html",
  styleUrls: ["./dashboard-item-list.component.scss"]
})
export class DashboardItemListComponent {

  @Input() public hasOnlyAdminUsers: boolean;

  constructor(public routesService: RoutesService) {
  }
}
