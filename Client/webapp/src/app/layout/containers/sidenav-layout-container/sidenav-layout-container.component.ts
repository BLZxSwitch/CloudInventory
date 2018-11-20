import { BlockScrollStrategy, ScrollStrategyOptions } from "@angular/cdk/overlay";
import { ChangeDetectionStrategy, Component, OnDestroy } from "@angular/core";
import { select, Store } from "@ngrx/store";
import { combineLatest, Subject } from "rxjs";
import { takeUntil } from "rxjs/operators";
import { BreakpointsService } from "../../../core/services/breakpoints.service";
import * as fromRoot from "../../../reducers/index";
import { SidenavClose, SidenavOpen } from "../../actions/layout.actions";

@Component({
  selector: "pr-sidenav-layout-container",
  templateUrl: "./sidenav-layout-container.component.html",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SidenavLayoutContainerComponent implements OnDestroy {
  public showSidenav$ = this.store.pipe(select(fromRoot.getShowSidenav));

  public mobile$ = this.breakpointsService.isMobile$;

  private strategy: BlockScrollStrategy;
  private ngUnsubscribe$ = new Subject();

  public constructor(private store: Store<fromRoot.IState>,
                     private scrollStrategyOptions: ScrollStrategyOptions,
                     private breakpointsService: BreakpointsService) {
    this.strategy = this.scrollStrategyOptions.block();

    combineLatest(this.showSidenav$, this.breakpointsService.isMobile$)
      .pipe(
        takeUntil(this.ngUnsubscribe$)
      )
      .subscribe(([showSidenav, isMobile]) => {
        if (showSidenav && isMobile) {
          this.strategy.enable();
        } else {
          this.strategy.disable();
        }
      });
  }

  public onSidenavOpen() {
    this.store.dispatch(new SidenavOpen());
  }

  public onSidenavClose() {
    this.store.dispatch(new SidenavClose());
  }

  public ngOnDestroy() {
    this.ngUnsubscribe$.next();
    this.ngUnsubscribe$.complete();
  }
}
