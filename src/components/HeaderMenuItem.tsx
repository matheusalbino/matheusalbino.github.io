import React, { memo, useMemo } from 'react';
import { For } from '@equal/react-logic';
import classNames from 'classnames';
import { useTheme } from '../common/Theme';

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
    const { theme } = useTheme();

    const {
      data: { to, title },
      active,
      onClick
    } = props;

    const HeaderMenuItemClassName = useMemo(
      () =>
        classNames('cursor-pointer flex items-center h-full p-4 transition-color duration-300 capitalize', {
          'font-medium text-primary bg-highlight hover:bg-highlight-dark': active && theme.base === 'dark',
          'font-medium text-highlight bg-primary hover:bg-primary-dark': active && theme.base === 'light',
          'hover:bg-primary-darkest': !active && theme.base === 'dark',
          'hover:bg-highlight-darkest': !active && theme.base === 'light'
        }),
      [theme.base, active]
    );

    return (
      <li
        className={HeaderMenuItemClassName}
        onClick={() => {
          onClick(to);
        }}
      >
        {title}
      </li>
    );
  })
);
