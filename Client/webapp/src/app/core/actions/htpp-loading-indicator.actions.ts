import {Action} from "@ngrx/store";

export enum HttpLoadingIndicatorTypes {
  HttpStarted = "[Http Loading] Started",
  HttpFinalized = "[Http Loading] Finalized",
}

export class HttpStarted implements Action {
  public readonly type = HttpLoadingIndicatorTypes.HttpStarted;
}

export class HttpFinalized implements Action {
  public readonly type = HttpLoadingIndicatorTypes.HttpFinalized;
}

export type HttpLoadingIndicatorActionsUnion = HttpStarted | HttpFinalized;
