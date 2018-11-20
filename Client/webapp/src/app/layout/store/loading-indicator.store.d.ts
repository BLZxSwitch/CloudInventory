import { IState } from "../../data/reducers";
import { ILoadingIndicatorState } from "./loading-indicator.state";

export interface ILoadingIndicatorStore extends IState {
  loadingIndicator: ILoadingIndicatorState;
}
