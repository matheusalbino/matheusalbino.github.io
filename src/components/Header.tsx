import classNames from 'classnames';
import React, { useEffect, useMemo, useState } from 'react';
import { useTheme } from '../common/Theme';
import { useSectionNavigation } from '../common/useSectionNavigation';
import DarkTheme from '../themes/DarkTheme';
import LightTheme from '../themes/LightTheme';
import { HeaderMenu } from './HeaderMenu';
import { HeaderMenuItem } from './HeaderMenuItem';
import { Toggle } from './Toggle';

const menuItems = [
  { to: 'welcome', title: 'Welcome' },
  { to: 'about', title: 'About' },
  { to: 'contact', title: 'Contact' }
];

export const Header: React.FC = () => {
  const { sectionActive, selectSection } = useSectionNavigation(
    menuItems.map((menu) => menu.to),
    document.body
  );

  const [selectedTheme, setSelectedTheme] = useState<'dark' | 'light'>('dark');

  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setTheme(selectedTheme === 'dark' ? DarkTheme : LightTheme);
  }, [selectedTheme, setTheme]);

  const headerClassName = useMemo(
    () =>
      classNames('w-full h-16 flex text-white fixed', {
        'bg-primary-dark': theme.base === 'dark',
        'bg-highlight-dark': theme.base === 'light'
      }),
    [theme.base]
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
        color={{
          normal: 'bg-highlight',
          active: 'bg-highlight'
        }}
        onChange={(value) => setSelectedTheme(value ? 'dark' : 'light')}
      />
    </header>
  );
};
