import React, { memo } from 'react';
import { For } from '@equal/react-logic';

interface HeaderMenuItemDataProps {
  to: string;
  title: string;
}

interface HeaderMenuItemProps {
  data: HeaderMenuItemDataProps;
  active: boolean;
  onClick(target: string): void;
}

interface ForExtraProps<T = any> {
  'for-active'(item: T, index: number): boolean;
  onClick(target: string): void;
}

export const HeaderMenuItem = For<HeaderMenuItemProps, ForExtraProps<HeaderMenuItemDataProps>, HeaderMenuItemDataProps>(
  memo((props) => {
    const {
      data: { to, title },
      active,
      onClick
    } = props;

    return (
      <li
        className={`cursor-pointer flex items-center h-full p-4 transition-all duration-300 capitalize ${
          active === true ? 'font-medium text-primary bg-highlight hover:bg-highlight-dark' : 'hover:bg-primary-darkest'
        }`}
        onClick={() => {
          onClick(to);
        }}
      >
        {title}
      </li>
    );
  })
);
