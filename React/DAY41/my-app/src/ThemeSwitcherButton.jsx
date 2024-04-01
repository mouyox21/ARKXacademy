// ThemeSwitcherButton.js

import React from 'react';
import { useTheme } from './theme';

function ThemeSwitcherButton() {
  const { toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      style={{
        padding: '8px 16px',
        backgroundColor: 'blue',
        color: 'white',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
      }}
    >
      Toggle Theme
    </button>
  );
}

export default ThemeSwitcherButton;
