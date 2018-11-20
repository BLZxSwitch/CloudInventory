import { nameof } from "../shared/nameof";
import { ILoadingIndicatorStore } from "./store/loading-indicator.store";

export const LOADING_INDICATOR_NAME = nameof<ILoadingIndicatorStore>("loadingIndicator");
