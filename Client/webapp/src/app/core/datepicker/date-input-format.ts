import { InjectionToken } from "@angular/core";
import { MatDateFormats } from "@angular/material";
import { MAT_MOMENT_DATE_FORMATS } from "@angular/material-moment-adapter";
import { DeviceDetectorService } from "ngx-device-detector";

export const DATE_INPUT_FORMAT = new InjectionToken<string>("DATE_INPUT_FORMAT");

export const dateInputParseFormat = "YYYY-MM-DD";

export function dateParseFormatInitializerFactory(deviceService: DeviceDetectorService) {
  let dateInputFormat = dateInputParseFormat;
  if (deviceService.isDesktop()) {
    dateInputFormat = "L";
  } else {
    dateInputFormat = dateInputParseFormat;
  }
  const DATE_FORMATS: MatDateFormats = {
    ...MAT_MOMENT_DATE_FORMATS,
    parse: {
      dateInput: dateInputFormat,
    },
    display: {
      ...MAT_MOMENT_DATE_FORMATS.display,
      dateInput: dateInputFormat
    },
  };
  return DATE_FORMATS;
}
