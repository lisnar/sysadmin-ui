/**
 * Does not allow `null` value on properties, but allows `undefined`.
 * */
export type NonNullProps<T extends Record<string, unknown>> = {
  [P in keyof T]: Exclude<T[P], null>;
};
