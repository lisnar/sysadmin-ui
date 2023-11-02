/* eslint-disable @typescript-eslint/unbound-method */
import { ReactNode, RefObject } from 'react';
import { AriaPopoverProps, DismissButton, Overlay, usePopover } from 'react-aria';
import { OverlayTriggerState } from 'react-stately';
import { classNames } from '../utils.ts';

interface PopoverProps extends AriaPopoverProps {
  children: ReactNode;
  className?: string;
  popoverRef: RefObject<HTMLDivElement>;
  state: OverlayTriggerState;
}

export function Popover({ children, className, state, ...props }: PopoverProps) {
  const { popoverRef, isNonModal } = props;
  const { popoverProps, underlayProps } = usePopover(props, state);

  return (
    <Overlay>
      {!isNonModal && <div {...underlayProps} className="fixed inset-0" />}
      <div {...popoverProps} ref={popoverRef} className={classNames('z-10', className)}>
        {!isNonModal && <DismissButton onDismiss={state.close} />}
        {children}
        <DismissButton onDismiss={state.close} />
      </div>
    </Overlay>
  );
}
