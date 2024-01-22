import { AriaListBoxProps } from 'react-aria';
import { useListState } from 'react-stately';
import { ListBoxBase } from './ListBoxBase.tsx';

// todo: simplify ListBox props
export function ListBox<T extends object>(props: AriaListBoxProps<T>) {
  const state = useListState(props);
  return <ListBoxBase {...props} state={state} shouldFocusOnHover shouldFocusWrap />;
}
