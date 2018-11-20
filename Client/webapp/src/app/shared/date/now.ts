export function now(): number {
  return new Date(Date.now() - new Date().getTimezoneOffset() * 60000).getTime();
}
