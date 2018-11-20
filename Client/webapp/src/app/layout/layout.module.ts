import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { EffectsModule } from "@ngrx/effects";
import { StoreModule } from "@ngrx/store";
import { TranslateModule } from "@ngx-translate/core";
import { MaterialModule } from "../material.module/material.module";
import { SharedModule } from "../shared.module/shared.module";
import { BackdropComponent } from "./components/backdrop/backdrop.component";
import { BasicLayoutComponent } from "./components/basic-layout/basic-layout.component";
import { EntityAddButtonComponent } from "./components/entity-add-button/entity-add-button.component";
import { LoadingIndicatorComponent } from "./components/loading-indicator/loading-indicator.component";
import { NavGroupComponent } from "./components/nav-group/nav-group.component";
import { NavItemComponent } from "./components/nav-item/nav-item.component";
import { NavMenuComponent } from "./components/nav-menu/nav-menu.component";
import { SidenavLayoutComponent } from "./components/sidenav-layout/sidenav-layout.component";
import { ToolbarComponent } from "./components/toolbar/toolbar.component";
import { UnauthorizedLayoutComponent } from "./components/unauthorized-layout/unauthorized-layout.component";
import { NavMenuContainerComponent } from "./containers/nav-menu-container/nav-menu-container.component";
import { SidenavLayoutContainerComponent } from "./containers/sidenav-layout-container/sidenav-layout-container.component";
import { LayoutEffects } from "./effects/layout.effects";
import { LoadingIndicatorEffects } from "./effects/loading-indicator.effects";
import { LOADING_INDICATOR_NAME } from "./loading-indicator.feature-name";
import { reducers } from "./reducers/reducers-map";
import { LoadingIndicatorService } from "./services/loading-indicator.service";

const INTERNAL_COMPONENTS = [
  NavItemComponent,
  ToolbarComponent,
  SidenavLayoutComponent,
  BackdropComponent,
  NavMenuComponent,
  NavGroupComponent,
  BasicLayoutComponent,
  LoadingIndicatorComponent,
];
const EXPORTED_COMPONENTS = [
  SidenavLayoutContainerComponent,
  UnauthorizedLayoutComponent,
  NavMenuContainerComponent,
  EntityAddButtonComponent,
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    TranslateModule,
    MaterialModule,
    SharedModule,
    StoreModule.forFeature(LOADING_INDICATOR_NAME, reducers()),
    EffectsModule.forRoot(
      [
        LayoutEffects,
        LoadingIndicatorEffects
      ])
  ],
  declarations: [
    ...INTERNAL_COMPONENTS,
    ...EXPORTED_COMPONENTS,
  ],
  exports: EXPORTED_COMPONENTS,
  providers: [
    LoadingIndicatorService
  ]
})
export class LayoutModule {
}
