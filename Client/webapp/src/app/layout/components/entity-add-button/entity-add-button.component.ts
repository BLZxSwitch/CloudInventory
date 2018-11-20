import { ChangeDetectionStrategy, Component, EventEmitter, Output } from "@angular/core";
import { ScrollService } from "../../../core/services/scroll.service";

@Component({
  selector: "pr-entity-add-button",
  templateUrl: "./entity-add-button.component.html",
  styleUrls: ["./entity-add-button.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EntityAddButtonComponent {

  @Output() public entityAdd = new EventEmitter();

  public scrolled$ = this.scrollService.isNotDefaultScrollPosition$;

  constructor(private scrollService: ScrollService) {
  }

  public onAddButtonClick() {
    this.entityAdd.emit();
  }
}
