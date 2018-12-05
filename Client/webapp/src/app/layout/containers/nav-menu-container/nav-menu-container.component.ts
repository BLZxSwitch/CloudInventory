import { ChangeDetectionStrategy, Component } from "@angular/core";
import { select, Store } from "@ngrx/store";
import { combineLatest } from "rxjs";
import { map } from "rxjs/operators";
import { Logout } from "../../../auth/actions/auth.actions";
import * as fromAuth from "../../../auth/reducers";
import { RoutesService } from "../../../core/services/routes.service";
import * as fromRoot from "../../../reducers/index";
import { SidenavClose } from "../../actions/layout.actions";
import { NavItem } from "../../components/nav-group/nav-group.component";

@Component({
  selector: "pr-nav-menu-container",
  templateUrl: "./nav-menu-container.component.html",
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NavMenuContainerComponent {

  public currentUserFullName$ = this.store.pipe(select(fromAuth.getFullName));

  public navGroups$ = combineLatest(
    this.store.pipe(select(fromAuth.isAdmin))
  )
    .pipe(
      map(([isAdmin]) => [
        {
          headerTranslationKey: "NAV_MENU.HEADER.HOME",
          items: [new NavItem(this.routesService.dashboard(), "NAV_MENU.LINK.DASHBOARD", "dashboard")]
        },
        ...(isAdmin ? [
          {
            headerTranslationKey: "NAV_MENU.HEADER.MANAGEMENT",
            items: []
          }
        ] : []),
        ...(isAdmin ? [{
            headerTranslationKey: "NAV_MENU.HEADER.MASTER_DATA",
            items: [new NavItem(this.routesService.orgUnits(), "NAV_MENU.LINK.ORG_UNITS", "group"),
              new NavItem(this.routesService.staff(), "NAV_MENU.LINK.STAFF", "group")]
          },
          ]
          : []),
        {
          headerTranslationKey: "NAV_MENU.HEADER.SETTINGS",
          items: [
            new NavItem(this.routesService.mySettings(), "NAV_MENU.LINK.MY_SETTINGS", "settings"),
            ...(isAdmin ? [
                new NavItem(this.routesService.companySettings(), "NAV_MENU.LINK.COMPANY_SETTINGS", "settings_applications")
              ]
              : []),
          ]
        }
      ])
    );

  constructor(private routesService: RoutesService, private store: Store<fromRoot.IState>) {
  }

  public onLogout() {
    this.store.dispatch(new Logout());
  }

  public onBack() {
    this.store.dispatch(new SidenavClose());
  }
}
