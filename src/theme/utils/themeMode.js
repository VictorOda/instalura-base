import { useState } from 'react';
import theme from '../index';

export const useDarkMode = () => {
  const [mode, setMode] = useState('main');
  const toggleMode = () => {
    if (mode === 'main') {
      setMode('dark');
      theme.mode = 'dark';
    } else {
      setMode('main');
      theme.mode = 'main';
    }
  };

  return [mode, toggleMode];
};
