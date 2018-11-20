// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

import { IEnvironment } from "./environments";

export const environment: IEnvironment = {
  production: false,
  BASE_URL: "http://localhost:51600",
  GOOGLE_PLACES_API_KEY: "AIzaSyBN4GYygTiDUZPDZuHE4NQ1Mbvvr_cyyFM",
  updateAppIntervalSec: 6,
  version: "0.0.local",
  globalIndicatorExcludeUrls: [
    "/api/EmailTaken/IsTaken",
    "/api/CompanyNameTaken/IsTaken"]
};
