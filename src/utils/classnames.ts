// Join className strings conditionally.
export function classNames(...classNames: (string | boolean | undefined)[]): string {
  return classNames.filter(Boolean).join(' ');
}
