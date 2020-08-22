import React from 'react';
export const Box: React.FC<{ className?: string }> = (props) => {
  return (
    <div
      className={`w-24 text-center shadow bg-black bg-opacity-25 p-4 rounded-sm flex flex-col items-center ${
        props.className ?? ''
      }`}
    >
      {props.children}
    </div>
  );
};
