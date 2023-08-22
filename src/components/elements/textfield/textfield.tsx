import { useRef } from 'react';
import { AriaTextFieldProps, mergeProps, useFocusRing, useTextField } from 'react-aria';
import { BsExclamationCircleFill } from 'react-icons/bs';
import { classNames } from '../utils.ts';

export function TextField(props: AriaTextFieldProps) {
  const { label, description, errorMessage, isDisabled } = props;
  const inputRef = useRef<HTMLInputElement>(null);

  // todo: use context and separate elements into atomics
  const field = useTextField(props, inputRef);
  const { focusProps, isFocused } = useFocusRing(props);

  return (
    <div>
      <div
        className={classNames(
          'relative w-96 rounded-md border text-sm text-gray-900 shadow outline-none transition',
          isDisabled
            ? 'borer-gray-300 bg-gray-50'
            : errorMessage
            ? isFocused
              ? 'border-red-500 ring-1 ring-red-500'
              : 'border-red-500'
            : isFocused
            ? 'border-indigo-500 ring-1 ring-indigo-500'
            : 'border-gray-300',
        )}
      >
        <label
          {...field.labelProps}
          className={classNames(
            'absolute -top-2 left-2 -mt-0.5 rounded bg-white px-1 text-xs font-medium',
            isDisabled
              ? 'bg-white text-gray-900'
              : errorMessage
              ? 'bg-white text-red-900'
              : 'bg-white text-gray-900',
            !isDisabled && 'cursor-text',
          )}
          // * style={{ boxShadow: '0 0.2rem 0.3rem -0.1rem white' }}
        >
          {label}
        </label>
        <input
          {...mergeProps(field.inputProps, focusProps)}
          ref={inputRef}
          className={classNames(
            'block w-full border-0 bg-transparent px-3 py-2 placeholder-gray-300 focus:ring-0 sm:text-sm',
            isDisabled ? 'text-gray-600' : 'text-gray-900',
          )}
        />
        {errorMessage && (
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
            <BsExclamationCircleFill className="h-5 w-5 text-red-500" aria-hidden="true" />
          </div>
        )}
      </div>
      {description && (
        <div {...field.descriptionProps} className="ml-3 mt-1 text-xs text-gray-700">
          {description}
        </div>
      )}
      {errorMessage && (
        <div {...field.errorMessageProps} className="ml-3 mt-1 text-xs text-red-600">
          {errorMessage}
        </div>
      )}
    </div>
  );
}

// import { useRef, useState } from 'react';
// import { AriaTextFieldProps, mergeProps, useFocus, useTextField } from 'react-aria';
//
// export interface InputProps extends AriaTextFieldProps {
//   className: string;
// }
//
// export default function Input(props: InputProps) {
//   const { className, label } = props;
//   const ref = useRef(null);
//   const [value, setValue] = useState('');
//
//   const { labelProps, inputProps, errorMessageProps } = useTextField(props, ref);
//   const { focusProps } = useFocus<HTMLInputElement>({
//     onFocus: (e) => setValue(e.target.value),
//     onBlur: (e) => setValue(e.target.value),
//   });
//
//   return (
//     <div>
//       <label {...labelProps}>{label}</label>
//       <input {...mergeProps(inputProps, focusProps)} ref={ref} className={className} />
//       {value.length < 1 && (
//         <div {...errorMessageProps} style={{ color: 'red', fontSize: 12 }}>
//           All fields are required
//         </div>
//       )}
//     </div>
//   );
// }
