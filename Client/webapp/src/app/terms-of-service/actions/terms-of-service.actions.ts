import {Action} from "@ngrx/store";

export enum TermsOfServiceActionTypes {
  Approve = "[Terms Of Service] Approve",
  ApproveRequest = "[Terms Of Service] Approve Request",
  ApproveSuccess = "[Terms Of Service] Approve Success",
  ApproveClosed = "[Terms Of Service] Approve Closed",
  Decline = "[Terms Of Service] Decline",
}

export class TermsOfServiceApprove implements Action {
  public readonly type = TermsOfServiceActionTypes.Approve;
}

export class TermsOfServiceApproveRequest implements Action {
  public readonly type = TermsOfServiceActionTypes.ApproveRequest;
}

export class TermsOfServiceApproveSuccess implements Action {
  public readonly type = TermsOfServiceActionTypes.ApproveSuccess;
}

export class TermsOfServiceApproveClosed implements Action {
  public readonly type = TermsOfServiceActionTypes.ApproveClosed;
}

export class TermsOfServiceDecline implements Action {
  public readonly type = TermsOfServiceActionTypes.Decline;
}

export type TermsOfServiceActionsUnion = TermsOfServiceApprove
  | TermsOfServiceApproveSuccess
  | TermsOfServiceApproveClosed;
