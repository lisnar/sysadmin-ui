import React from 'react';

/**
 * Merge multiple refs into one. Works with callback and object refs.
 * https://mayursinhsarvaiya.medium.com/how-to-merge-refs-in-react-component-d5e4623b6924
 */
export function mergeRefs<T = unknown>(...refs: React.ForwardedRef<T>[]): React.RefCallback<T> {
  return function (node: T) {
    for (const ref of refs) {
      if (!ref) continue;

      if (typeof ref === 'function') ref(node);
      if ('current' in ref) ref.current = node;
    }
  };
}

/**
 * Join className strings conditionally.
 */
export function classNames(...classNames: (string | boolean | undefined)[]): string {
  return classNames.filter(Boolean).join(' ');
}
