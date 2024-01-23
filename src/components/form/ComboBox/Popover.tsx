import React from 'react';
import { AriaPopoverProps, DismissButton, Overlay, usePopover } from 'react-aria';
import { OverlayTriggerState } from 'react-stately';
import { twMerge } from 'tailwind-merge';

interface PopoverProps extends AriaPopoverProps {
  children: React.ReactNode;
  className?: string;
  popoverRef: React.RefObject<HTMLDivElement>;
  state: OverlayTriggerState;
}

export function Popover({ children, className, state, ...props }: PopoverProps) {
  const { popoverProps, underlayProps } = usePopover(props, state);
  const { popoverRef, isNonModal } = props;

  return (
    <Overlay>
      {!isNonModal && <div {...underlayProps} className="fixed inset-0" />}
      <div {...popoverProps} ref={popoverRef} className={twMerge('z-10', className)}>
        {!isNonModal && <DismissButton onDismiss={() => state.close()} />}
        {children}
        <DismissButton onDismiss={() => state.close()} />
      </div>
    </Overlay>
  );
}
