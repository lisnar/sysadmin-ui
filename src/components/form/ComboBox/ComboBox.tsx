/* eslint-disable @typescript-eslint/unbound-method */
import React from 'react';
import { AriaComboBoxProps, useComboBox, useFilter } from 'react-aria';
import { ComboBoxState, useComboBoxState } from 'react-stately';
import { ButtonBase } from '../../elements/Button';
import { ExclamationSolidIcon, SelectorIcon } from '../../icons';
import { classNames } from '../../utils.ts';
import { ListBoxInner } from '../ListBox';
import {
  fieldContainerStyle,
  fieldHelperTextVariant,
  fieldInputStyle,
  fieldLabelStyle,
} from '../style.ts';
import { Popover } from './Popover.tsx';

export function ComboBox<T extends object>(props: AriaComboBoxProps<T>) {
  const { contains } = useFilter({ sensitivity: 'base' });
  const state = useComboBoxState({ ...props, defaultFilter: contains, menuTrigger: 'focus' });
  useAutoFocusOption(state);

  const buttonRef = React.useRef<HTMLButtonElement>(null);
  const inputRef = React.useRef<HTMLInputElement>(null);
  const listBoxRef = React.useRef<HTMLUListElement>(null);
  const popoverRef = React.useRef<HTMLDivElement>(null);

  const { inputProps, labelProps, descriptionProps, errorMessageProps, buttonProps, listBoxProps } =
    useComboBox({ ...props, inputRef, buttonRef, listBoxRef, popoverRef }, state);

  const { isOpen, isFocused } = state;
  const { label, description, errorMessage, isDisabled } = props;
  const isInvalid = !!errorMessage && !isDisabled;

  return (
    <div className={fieldContainerStyle}>
      {/* input group */}
      <div className="relative">
        <label {...labelProps} className={fieldLabelStyle}>
          {label}
        </label>
        <input
          {...inputProps}
          ref={inputRef}
          className={classNames(fieldInputStyle, 'pr-8')}
          data-focused={isFocused || undefined}
          data-invalid={isInvalid || undefined}
          data-disabled={isDisabled! || undefined}
        />
        {/* trigger button */}
        <ButtonBase {...buttonProps} ref={buttonRef} className="absolute inset-y-0 right-0 px-2">
          <SelectorIcon
            size="sm"
            className="text-gray-400 transition duration-75"
            aria-hidden="true"
          />
        </ButtonBase>
      </div>

      {/* helper text group */}
      {isInvalid && (
        <small {...errorMessageProps} className={fieldHelperTextVariant({ intent: 'error' })}>
          <ExclamationSolidIcon size="xs" className="mr-0.5" aria-hidden="true" />
          {errorMessage}
        </small>
      )}
      {description && (
        <small {...descriptionProps} className={fieldHelperTextVariant({ intent: 'description' })}>
          {description}
        </small>
      )}

      {/* popover & listbox */}
      {isOpen && (
        <Popover
          popoverRef={popoverRef}
          triggerRef={inputRef}
          state={state}
          placement="bottom"
          className="mb-4 mt-1.5"
          isNonModal
        >
          <ListBoxInner
            {...listBoxProps}
            ref={listBoxRef}
            state={state}
            className="max-h-60 w-64 shadow-lg"
          />
        </Popover>
      )}
    </div>
  );
}

/**
 * When ListBox is opened or updated, set focus to last selected option (if available) or first option.
 */
function useAutoFocusOption({
  isOpen,
  collection,
  selectedKey,
  selectionManager,
}: ComboBoxState<unknown>) {
  const [previousKey, setPreviousKey] = React.useState(selectedKey);

  React.useEffect(() => {
    if (selectedKey) setPreviousKey(selectedKey);
  }, [selectedKey]);

  React.useEffect(() => {
    if (isOpen && collection.size > 0) {
      let focusedKey = collection.getItem(previousKey) ? previousKey : collection.getFirstKey();
      while (
        focusedKey &&
        (collection.getItem(focusedKey)?.type !== 'item' || selectionManager.isDisabled(focusedKey))
      ) {
        focusedKey = collection.getKeyAfter(focusedKey);
      }
      selectionManager.setFocusedKey(focusedKey);
    }
  }, [isOpen, collection]); // eslint-disable-line react-hooks/exhaustive-deps
}
