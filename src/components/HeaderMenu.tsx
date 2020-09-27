import React, { memo } from 'react';

export const HeaderMenu: React.FC<{ children: React.ReactNode }> = memo(function HeaderMenu(props) {
  const { children } = props;

  return (
    <nav>
      <ul className="flex h-full">{children}</ul>
    </nav>
  );
});
