import { merge } from 'lodash';
import React, { createContext, useCallback, useContext, useEffect, useState } from 'react';

export interface Theme {
  base: 'light' | 'dark';
  color: {
    primaryDefault: string;
    primaryDark: string;
    primaryDarkest: string;
    secondary: string;
    highlightDefault: string;
    highlightDark: string;
    highlightDarkest: string;
  };
}

type ThemeCSSVariables = Record<string, string>;

export const mapTheme = (variables: Theme): Record<string, string> => {
  return {
    '--color-primary': variables.color.primaryDefault,
    '--color-primary-dark': variables.color.primaryDark,
    '--color-primary-darkest': variables.color.primaryDarkest,
    '--color-secondary': variables.color.secondary,
    '--color-highlight': variables.color.highlightDefault,
    '--color-highlight-dark': variables.color.highlightDark,
    '--color-highlight-darkest': variables.color.highlightDarkest
  };
};

export const applyTheme = (theme: Theme): void => {
  const themeObject: ThemeCSSVariables = mapTheme(theme);

  const root = document.documentElement;

  for (const [key, value] of Object.entries(themeObject)) {
    root.style.setProperty(key, value);
  }
};

type DeepPartial<T> = T extends Function ? T : T extends object ? { [P in keyof T]?: DeepPartial<T[P]> } : T;

interface IThemeContext {
  theme: Theme;
  setTheme: React.Dispatch<React.SetStateAction<Theme>>;
  extendTheme(props: DeepPartial<Theme>): void;
}

const ThemeContext: React.Context<IThemeContext> = createContext(({} as unknown) as IThemeContext);

export const useTheme = (): IThemeContext => useContext<IThemeContext>(ThemeContext);

export const ThemeSettings: React.FC<{ theme: Theme }> = (props) => {
  const { children, theme: defaultTheme } = props;
  const [theme, setTheme] = useState(defaultTheme);

  const extendTheme = useCallback((override: DeepPartial<Theme>): any => {
    setTheme((prev) => ({ ...merge(prev, override) }));
  }, []);

  useEffect(() => {
    applyTheme(theme);
  }, [theme]);

  return (
    <ThemeContext.Provider
      value={{
        theme,
        setTheme,
        extendTheme
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};
