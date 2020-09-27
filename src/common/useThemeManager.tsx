import { useEffect, useState } from 'react';
import DarkTheme from '../themes/DarkTheme';
import LightTheme from '../themes/LightTheme';
import { useTheme } from './Theme';

interface ThemeManager {
  selectedTheme: 'dark' | 'light';
  selectTheme: React.Dispatch<React.SetStateAction<'dark' | 'light'>>;
}

export function useThemeManager(): ThemeManager {
  const [selectedTheme, selectTheme] = useState<'dark' | 'light'>('dark');

  const { setTheme } = useTheme();

  useEffect(() => {
    setTheme(selectedTheme === 'dark' ? DarkTheme : LightTheme);
  }, [selectedTheme, setTheme]);

  return {
    selectedTheme,
    selectTheme
  };
}
