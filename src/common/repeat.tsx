import React from 'react';
import { pickBy, mapValues, mapKeys } from 'lodash';

type ForProps<T> = { [P in keyof T]?: any } & { 'for-key'?(item: T, index: number): string | number; for: T[] };

type ForComponent<T> = React.FC<T> | ((props: T) => React.FC<T>);

export function For<T>(Component: ForComponent<T>): React.FC<ForProps<T>> {
  const Wrapper: React.FC<ForProps<T>> = (props: ForProps<T>): React.ReactElement => {
    const { for: list, 'for-key': getKey, ...propsToPass } = props;

    const componentProps = (pickBy(propsToPass, (_value, key) => !key.startsWith('for-')) as unknown) as T;
    const processProps = pickBy(propsToPass, (_value, key) => key.startsWith('for-'));

    return (
      <React.Fragment>
        {list.map((data: any, index: number) => {
          const key = getKey?.(data, index) ?? index;

          const transformedProps = (mapKeys(
            mapValues(processProps as any, (fn: Function): any => fn(data)),
            (_value, key: string): string => key.replace('for-', '')
          ) as unknown) as T;

          const props = ({ key, ...data, ...transformedProps, ...componentProps } as unknown) as T;

          if (typeof Component === 'function') {
            return Component(props);
          }

          return React.createElement(Component, props);
        })}
      </React.Fragment>
    );
  };

  Wrapper.displayName = 'For';

  Wrapper.defaultProps = {
    for: []
  };

  return Wrapper;
}
