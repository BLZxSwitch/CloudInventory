import { InjectionToken } from "@angular/core";
import { SchedulerLike } from "rxjs/index";

export const RXJS_SCHEDULER = new InjectionToken<SchedulerLike>("rxjs scheduler");
