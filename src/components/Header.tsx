import React, { useMemo } from 'react';
import { useSectionNavigation } from '../common/useSectionNavigation';
import { HeaderMenu } from './HeaderMenu';
import { HeaderMenuItem } from './HeaderMenuItem';

export const Header: React.FC = () => {
  const menuItems = useMemo(
    () => [
      { to: 'welcome', title: 'Welcome' },
      { to: 'about', title: 'About' },
      { to: 'contact', title: 'Contact' }
    ],
    []
  );
  const { sectionActive, selectSection } = useSectionNavigation(
    menuItems.map((menu) => menu.to),
    document.body
  );

  return (
    <header className="bg-primary-dark w-full h-16 flex justify-center text-white fixed">
      <HeaderMenu>
        <HeaderMenuItem
          for={menuItems}
          for-key={(menu) => menu.to}
          for-active={(menu: any) => sectionActive === menu.to}
          onClick={selectSection}
        />
      </HeaderMenu>
    </header>
  );
};
