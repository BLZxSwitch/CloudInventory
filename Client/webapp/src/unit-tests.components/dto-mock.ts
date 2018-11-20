export class DtoMock<T> {
  private readonly _instance: T;

  constructor(instance?: T) {
    this._instance = instance === undefined ? {} as T : instance;
  }

  public property(setter: (instance: T) => void): DtoMock<T> {
    setter(this._instance);
    return this;
  }

  public object(): T {
    return this._instance;
  }
}
