import React from 'react';
import { Item } from 'react-stately';
import { classNames } from '../../utils.ts';
import { Option } from './ListBox.tsx';
import { Text } from './ListBoxBase.tsx';

export function renderOption(key: React.Key, value: Option) {
  return (
    <Item key={key} textValue={value.label ?? value.key}>
      {/* optional icon */}
      {!!value.icon && (
        <div className="absolute h-5 w-5" aria-hidden="true">
          {value.icon}
        </div>
      )}

      <div className={classNames('truncate', !!value.icon && 'ml-7')}>
        {/* label */}
        <Text slot="label">{value.label ?? value.key}</Text>
        {/* description */}
        {!!value.description && (
          <span className="font-light text-gray-400 group-data-focused:text-white">
            <span aria-hidden="true"> - </span>
            <Text slot="description">{value.description}</Text>
          </span>
        )}
      </div>
    </Item>
  );
}
