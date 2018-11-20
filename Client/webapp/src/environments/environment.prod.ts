import { IEnvironment } from "./environments";

export const environment: IEnvironment = {
  production: true,
  BASE_URL: ".",
  GOOGLE_PLACES_API_KEY: "AIzaSyBN4GYygTiDUZPDZuHE4NQ1Mbvvr_cyyFM",
  updateAppIntervalSec: 60 * 60,
  version: "0.0.0",
  globalIndicatorExcludeUrls: [
    "/api/EmailTaken/IsTaken",
    "/api/CompanyNameTaken/IsTaken"]
};
