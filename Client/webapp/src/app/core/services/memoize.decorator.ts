// that is custom Memoize decorator implementation for this service only
// if you need memoize decorator - use https://www.npmjs.com/package/typescript-memoize
// tslint:disable:no-invalid-this
export const Memoize = () => (target: any, propertyName: string): void => {

  let func = target[propertyName];

  Object.defineProperty(target, propertyName, {
    get: () => func,
    set: newVal => {
      func = getNewFunction(newVal, (...args) => args.join(""));
    },
    enumerable: true,
    configurable: true
  });
};

let counter = 0;

function getNewFunction(originalMethod: () => void, hashFunction?: (...args: any[]) => any) {
  const identifier = ++counter;

  // The function returned here gets called instead of originalMethod.
  return function (...args: any[]) {
    const propValName = `__memoized_value_${identifier}`;
    const propMapName = `__memoized_map_${identifier}`;

    let returnedValue: any;

    if (hashFunction || args.length > 0) {

      // Get or create map
      if (!this.hasOwnProperty(propMapName)) {
        Object.defineProperty(this, propMapName, {
          configurable: false,
          enumerable: false,
          writable: false,
          value: new Map<any, any>()
        });
      }
      const myMap: Map<any, any> = this[propMapName];

      const hashKey = hashFunction ? hashFunction.apply(this, args) : args[0];

      if (myMap.has(hashKey)) {
        returnedValue = myMap.get(hashKey);
      } else {
        returnedValue = originalMethod.apply(this, args);
        myMap.set(hashKey, returnedValue);
      }

    } else {

      if (this.hasOwnProperty(propValName)) {
        returnedValue = this[propValName];
      } else {
        returnedValue = originalMethod.apply(this, args);
        Object.defineProperty(this, propValName, {
          configurable: false,
          enumerable: false,
          writable: false,
          value: returnedValue
        });
      }
    }

    return returnedValue;
  };
}
