import { Component, EventEmitter, Input, Output } from "@angular/core";
import { IOrgUnitResponseDTO } from "../../../core/services/service-proxies";

@Component({
  selector: "pr-org-units-list-item",
  styleUrls: ["./org-units.list-item.component.scss"],
  templateUrl: "./org-units.list-item.component.html"
})
export class OrgUnitsListItemComponent {
  @Input()
  public item: IOrgUnitResponseDTO;

  @Output()
  public edit = new EventEmitter();

  @Output()
  public delete = new EventEmitter();
}
