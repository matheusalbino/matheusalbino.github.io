import classNames from 'classnames';
import React, { memo } from 'react';
import { useTheme } from '../common/Theme';

export const Box: React.FC<{ className?: string }> = memo(function Box(props) {
  const { theme } = useTheme();

  const BoxClassName = classNames(
    'w-24 text-center shadow p-4 rounded-sm flex flex-col items-center',
    props.className,
    { 'bg-primary-darkest': theme.base === 'dark', 'bg-highlight-darkest': theme.base === 'light' }
  );

  return <div className={BoxClassName}>{props.children}</div>;
});
