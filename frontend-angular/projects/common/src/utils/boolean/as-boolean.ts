export function asBoolean(input: string | boolean | number | undefined): boolean {
  return typeof input === 'number'
    ? input !== 0
    : !!input || input === '';
}
