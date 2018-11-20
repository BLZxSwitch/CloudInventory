import { ActionReducerMap, createFeatureSelector, createSelector } from "@ngrx/store";
import * as fromRoot from "../../reducers";
import * as fromCompanySettings from "./company-settings.reducer";

export interface ICompanySettings {
  companySettings: fromCompanySettings.IState;
}

export const COMPANY_SETTINGS = "companySettings";

export interface IState extends fromRoot.IState {
  companySettings: ICompanySettings;
}

export function reducers(): ActionReducerMap<ICompanySettings> {
  return {
    companySettings: fromCompanySettings.reducer,
  };
}

export const selectCompanySettingsState = createFeatureSelector<ICompanySettings>(COMPANY_SETTINGS);

export const selectAuthStatusState = createSelector(
  selectCompanySettingsState,
  (state: ICompanySettings) => state.companySettings
);
export const getTenantSettings = createSelector(
  selectAuthStatusState,
  fromCompanySettings.getTenantSettings
);
