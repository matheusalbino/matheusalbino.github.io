import classNames from 'classnames';
import React from 'react';

export const Toggle: React.FC<{
  name: string;
  label: string;
  value: boolean;
  onChange(value: boolean): void;
  className?: string;
  color?: { normal: string; active: string };
}> = (props) => {
  const { name, label, value, onChange, className, color } = props;

  return (
    <label htmlFor={name} className={classNames('inline-flex items-center cursor-pointer', className)}>
      <span className="relative">
        <span className="block w-10 h-6 bg-gray-400 rounded-full shadow-inner"></span>
        <span
          className={classNames(
            'absolute block w-4 h-4 mt-1 ml-1 rounded-full shadow inset-y-0 left-0 focus-within:shadow-outline transition-transform duration-300 ease-in-out',
            {
              [color?.normal as string]: !value && color?.normal !== undefined,
              'bg-white': !value && color?.normal === undefined
            },
            {
              [color?.active as string]: value && color?.active !== undefined,
              'bg-black': value && color?.active === undefined,
              'transform translate-x-full': value
            }
          )}
        >
          <input
            id={name}
            name={name}
            type="checkbox"
            checked={value}
            className="absolute opacity-0 w-0 h-0"
            onChange={() => {
              onChange(!value);
            }}
          />
        </span>
      </span>
      <span className="ml-3 text-sm">{label}</span>
    </label>
  );
};
