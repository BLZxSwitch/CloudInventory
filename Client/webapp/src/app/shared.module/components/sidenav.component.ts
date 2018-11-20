import { ChangeDetectionStrategy, Component, Input } from "@angular/core";

@Component({
  selector: "pr-sidenav",
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <mat-sidenav mode="side" [opened]="open">
      <mat-nav-list>
        <ng-content></ng-content>
      </mat-nav-list>
    </mat-sidenav>
  `,
  styles: [
    `
    mat-sidenav {
      width: 300px;
    }
  `,
  ],
})
export class SidenavComponent {
  @Input() public open = false;
}
