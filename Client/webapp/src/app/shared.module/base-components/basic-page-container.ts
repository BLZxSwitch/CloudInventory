import { select, Store } from "@ngrx/store";
import { Observable } from "rxjs";

export class BasicPageContainer<IState> {
  public pending$: Observable<boolean>;
  public error$: Observable<any>;

  constructor(store: Store<IState>, pendingSelector, errorSelector) {
    this.pending$ = store.pipe(select<IState, boolean>(pendingSelector));
    this.error$ = store.pipe(select(errorSelector));
  }
}
