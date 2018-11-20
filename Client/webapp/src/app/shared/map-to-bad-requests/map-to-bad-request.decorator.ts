import { add } from "./map-to-bad-request.registrations";

export function MapToBadRequest<T extends { new(...args: any[]): {} }>(key: string): ClassDecorator {
  return (target): void => {
    add((target as any) as T, key);
  };
}
