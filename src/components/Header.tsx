import classNames from 'classnames';
import React, { memo, useCallback, useMemo } from 'react';
import { useSectionNavigation } from '../common/useSectionNavigation';
import { useThemeManager } from '../common/useThemeManager';
import { HeaderMenu } from './HeaderMenu';
import { HeaderMenuItem } from './HeaderMenuItem';
import { Toggle } from './Toggle';

const menuItems = [
  { to: 'welcome', title: 'Welcome' },
  { to: 'about', title: 'About' },
  { to: 'contact', title: 'Contact' }
];

export const Header: React.FC = memo(function Header() {
  const { sectionActive, selectSection } = useSectionNavigation(
    menuItems.map((menu) => menu.to),
    document.body
  );
  const { selectedTheme, selectTheme } = useThemeManager();

  const headerClassName = useMemo(
    () =>
      classNames('w-full h-16 flex text-white fixed shadow-md', {
        'bg-primary-dark': selectedTheme === 'dark',
        'bg-highlight-dark': selectedTheme === 'light'
      }),
    [selectedTheme]
  );

  const onToggleTheme = useCallback(
    (value: boolean): void => {
      selectTheme(value ? 'dark' : 'light');
    },
    [selectTheme]
  );

  return (
    <header className={headerClassName}>
      <div className="w-full h-16 flex justify-center">
        <HeaderMenu>
          <HeaderMenuItem
            for={menuItems}
            for-key={(menu) => menu.to}
            for-active={(menu) => sectionActive === menu.to}
            onClick={selectSection}
          />
        </HeaderMenu>
      </div>
      <Toggle
        name="mode"
        className="px-4"
        label={selectedTheme === 'dark' ? 'Dark' : 'Light'}
        value={selectedTheme === 'dark'}
        color={{ normal: 'bg-highlight', active: 'bg-highlight' }}
        onChange={onToggleTheme}
      />
    </header>
  );
});
