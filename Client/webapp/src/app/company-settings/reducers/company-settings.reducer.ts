import { TenantSettingsDTO } from "../../core/services/service-proxies";
import { CompanySettingsActionsUnion, CompanySettingsActionTypes } from "../actions/company-settings.actions";

export interface IState {
  tenantSettings: TenantSettingsDTO;
}

export const initialState: IState = {
  tenantSettings: undefined,
};

export function reducer(state = initialState, action: CompanySettingsActionsUnion): IState {
  switch (action.type) {
    case CompanySettingsActionTypes.CompanySettingsEditSuccess:
    case CompanySettingsActionTypes.CompanySettingsLoadSuccess: {
      return {
        ...state,
        tenantSettings: action.payload.tenantSettings,
      };
    }

    default: {
      return state;
    }
  }
}

export const getTenantSettings = (state: IState) => state.tenantSettings;
