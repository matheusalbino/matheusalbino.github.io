import React from 'react';

export const HeaderMenu: React.FC = (props) => {
  return (
    <nav>
      <ul className="flex h-full">{props.children}</ul>
    </nav>
  );
};
