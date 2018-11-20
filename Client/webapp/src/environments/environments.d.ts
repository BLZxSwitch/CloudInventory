export interface IEnvironment {
  production: boolean;
  BASE_URL: string;
  GOOGLE_PLACES_API_KEY: string;
  updateAppIntervalSec: number;
  version: string;
  globalIndicatorExcludeUrls: string[];
}
