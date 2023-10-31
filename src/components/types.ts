/**
 * Does not allow `null` value on properties, but allows `undefined`.
 * */
export type NonNullProps<T extends object> = {
  [P in keyof T]: Exclude<T[P], null>;
};

/**
 * Selects all keys of T that have values of type V.
 */
export type FilterKey<T extends object, V> = {
  [P in keyof T]: T[P] extends V ? P : never;
}[keyof T];

/**
 * Selects all properties of T that have values of type V.
 */
export type FilterProps<T extends object, V> = Pick<T, FilterKey<T, V>>;
