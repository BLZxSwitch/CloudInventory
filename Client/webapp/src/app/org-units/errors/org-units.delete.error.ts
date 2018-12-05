import { HttpErrorResponse, HttpRequest } from "@angular/common/http";
import { AsDescriptable } from "../../shared/descriptable/descriptable.decorator";
import { MapToBadRequest } from "../../shared/map-to-bad-requests/map-to-bad-request.decorator";

@MapToBadRequest("ORG_UNIT_HAS_MOLS_DELETE_FAILED")
@AsDescriptable("COMMON.DELETE_OPERATION.FAILED")
export class OrgUnitsDeleteError {
  constructor(public request: HttpRequest<any>,
              public response: HttpErrorResponse) {
  }
}
