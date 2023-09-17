import { classNames } from '../utils.ts';

export const listBoxLabelStyle = 'text-sm font-medium text-gray-700';
export const listBoxULStyle = classNames(
  'overflow-auto', // behavior
  'mt-1 w-full rounded-md bg-white py-1 text-sm shadow-lg', // appearance
  'ring-1 ring-black ring-opacity-5 focus:outline-none', // outline
);
export const listBoxOptionContainerStyle = classNames(
  'group relative cursor-default select-none', // behavior
  'py-2 pl-3 pr-9', // appearance
  'outline-none focus:bg-indigo-600 focus:text-white', // focused state
  'data-[disabled]:pointer-events-none data-[disabled]:bg-gray-100', // disabled state
);
export const listBoxOptionItemStyle =
  'truncate font-normal text-gray-900 group-focus:text-white group-data-[selected]:font-bold group-data-[disabled]:text-gray-400';
export const listBoxOptionDescriptionStyle =
  'ml-2 truncate text-gray-500 group-focus:text-indigo-200 group-data-[disabled]:text-gray-400';
export const listBoxSectionSeparatorStyle = 'mx-2 my-1 border-t border-gray-300';
export const listBoxSectionHeadingStyle =
  'text-center mx-3 mb-0.5 text-xs font-bold uppercase text-gray-500';
