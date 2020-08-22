import React, { memo } from 'react';
import { For } from '../common/repeat';

interface HeaderMenuItemProps {
  to: string;
  title: string;
  active?: boolean;
  onClick?(target: string): void;
}

export const HeaderMenuItem = For(
  memo((props: HeaderMenuItemProps) => {
    const { to, title, active, onClick } = props;

    return (
      <li
        className={`cursor-pointer flex items-center h-full p-4 transition-all duration-300 capitalize ${
          active === true ? 'font-medium text-primary bg-highlight hover:bg-highlight-dark' : 'hover:bg-primary-darkest'
        }`}
        onClick={() => {
          onClick?.(to);
        }}
      >
        {title}
      </li>
    );
  })
);
