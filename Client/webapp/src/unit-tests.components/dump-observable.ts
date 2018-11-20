import { getTestScheduler } from "jasmine-marbles";
import { Notification, Observable, Subscription } from "rxjs";
import { TestMessage } from "rxjs/internal/testing/TestMessage";

function materializeInnerObservable(
  observable: Observable<any>,
  outerFrame: number
): TestMessage[] {
  const messages: TestMessage[] = [];
  const scheduler = getTestScheduler();

  observable.subscribe(
    value => {
      messages.push({
        frame: scheduler.frame - outerFrame,
        notification: Notification.createNext(value)
      });
    },
    err => {
      messages.push({
        frame: scheduler.frame - outerFrame,
        notification: Notification.createError(err)
      });
    },
    () => {
      messages.push({
        frame: scheduler.frame - outerFrame,
        notification: Notification.createComplete()
      });
    }
  );
  return messages;
}

export function dumpObservable(observable: Observable<any>): TestMessage[] {
  const results: TestMessage[] = [];
  let subscription: Subscription;
  const scheduler = getTestScheduler();

  scheduler.schedule(() => {
    subscription = observable.subscribe(
      (x: any) => {
        let value = x;

        // Support Observable-of-Observables
        if (x instanceof Observable) {
          value = materializeInnerObservable(value, scheduler.frame);
        }

        results.push({
          frame: scheduler.frame,
          notification: Notification.createNext(value)
        });
      },
      (err: any) => {
        results.push({
          frame: scheduler.frame,
          notification: Notification.createError(err)
        });
      },
      () => {
        results.push({
          frame: scheduler.frame,
          notification: Notification.createComplete()
        });
      }
    );
  });
  scheduler.flush();
  return results;
}
