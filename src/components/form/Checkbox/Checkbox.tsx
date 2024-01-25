import React from 'react';
import { AriaCheckboxProps, useCheckbox } from 'react-aria';
import { useToggleState } from 'react-stately';

interface CheckboxProps extends AriaCheckboxProps {
  className?: string;
}

export function Checkbox(props: CheckboxProps) {
  const ref = React.useRef(null);
  const state = useToggleState(props);
  const { inputProps } = useCheckbox(props, state, ref);

  return (
    <label className="block">
      <input {...inputProps} ref={ref} />
      {props.children}
    </label>
  );
}
