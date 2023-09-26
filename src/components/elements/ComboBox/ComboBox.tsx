import { useEffect, useRef } from 'react';
import { AriaComboBoxProps, useComboBox, useFilter } from 'react-aria';
import { useComboBoxState } from 'react-stately';
import { ChevronDownIcon } from '../../icons';
import { HeadlessButton } from '../Button';
import { ListBox } from './ListBox';
import { Popover } from './Popover';

// ComboBox example from React Aria docs.
export function ComboBox<T extends object>(props: AriaComboBoxProps<T>) {
  const { contains } = useFilter({ sensitivity: 'base' }); // eslint-disable-line @typescript-eslint/unbound-method
  const state = useComboBoxState({ ...props, defaultFilter: contains, menuTrigger: 'focus' });
  const { isOpen, collection, selectedKey, selectionManager } = state;

  // When ListBox is opened or updated, set focus to selected item (if available) or first item.
  useEffect(() => {
    if (isOpen && collection.size > 0) {
      const focusedKey = collection.getItem(selectedKey) ? selectedKey : collection.getFirstKey();
      selectionManager.setFocusedKey(focusedKey);
    }
  }, [isOpen, collection]); // eslint-disable-line react-hooks/exhaustive-deps

  const buttonRef = useRef<HTMLButtonElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const listBoxRef = useRef<HTMLUListElement>(null);
  const popoverRef = useRef<HTMLDivElement>(null);

  const { buttonProps, inputProps, listBoxProps, labelProps } = useComboBox(
    { ...props, inputRef, buttonRef, listBoxRef, popoverRef },
    state,
  );

  return (
    <div className="relative inline-flex w-52 flex-col">
      <label {...labelProps} className="block text-left text-sm font-medium text-gray-700">
        {props.label}
      </label>
      <div
        className={`relative flex flex-row overflow-hidden rounded-md border-2 shadow-sm ${
          state.isFocused ? 'border-pink-500' : 'border-gray-300'
        }`}
      >
        <input {...inputProps} ref={inputRef} className="w-full border-0 px-3 py-1 outline-none" />
        <HeadlessButton
          {...buttonProps}
          ref={buttonRef}
          className={`cursor-default border-l-2 bg-gray-100 px-1 ${
            state.isFocused ? 'border-pink-500 text-pink-600' : 'border-gray-300 text-gray-500'
          }`}
        >
          <ChevronDownIcon className="h-5 w-5" aria-hidden="true" />
        </HeadlessButton>
      </div>
      {state.isOpen && (
        <Popover
          popoverRef={popoverRef}
          triggerRef={inputRef}
          state={state}
          isNonModal
          placement="bottom start"
          className="-ml-0.5 w-52"
        >
          <ListBox {...listBoxProps} listBoxRef={listBoxRef} state={state} />
        </Popover>
      )}
    </div>
  );
}
