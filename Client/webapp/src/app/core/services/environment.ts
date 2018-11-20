import { Injectable } from "@angular/core";
import { environment } from "../../../environments/environment";
import { IEnvironment } from "../../../environments/environments";

@Injectable({
  providedIn: "root"
})
export class Environment implements IEnvironment {

  public get BASE_URL(): string {
    return environment.BASE_URL;
  }

  public get GOOGLE_PLACES_API_KEY(): string {
    return environment.GOOGLE_PLACES_API_KEY;
  }

  public get production(): boolean {
    return environment.production;
  }

  public get updateAppIntervalSec(): number {
    return environment.updateAppIntervalSec;
  }

  public get version(): string {
    return environment.version;
  }

  public get globalIndicatorExcludeUrls(): string[] {
    return environment.globalIndicatorExcludeUrls;
  }
}
