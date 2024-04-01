// ThemeSwitcher.js

import React from 'react';
import { useTheme } from './theme';

function ThemeSwitcher() {
  const { toggleTheme } = useTheme();

  return (
    <button onClick={toggleTheme}>Toggle Theme</button>
  );
}

export default ThemeSwitcher;
