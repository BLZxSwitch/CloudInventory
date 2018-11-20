const REGISTERED_BAD_REQUEST_MAPPINGS: { type: { new(...args: any[]): {} }, key: string }[] = [];

export function clear(): void {
  REGISTERED_BAD_REQUEST_MAPPINGS.splice(0, REGISTERED_BAD_REQUEST_MAPPINGS.length);
}

export function add(type: { new(...args: any[]): {} }, key: string): void {
  REGISTERED_BAD_REQUEST_MAPPINGS.push({type, key});
}

export function get(): { type: { new(...args: any[]): {} }, key: string }[] {
  return [...REGISTERED_BAD_REQUEST_MAPPINGS];
}
