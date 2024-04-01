// App.js

import React from 'react';
import { ThemeProvider } from './theme';
import MyComponent from './MyComponent';
import ThemeSwitcherButton from './ThemeSwitcherButton';

function App() {
  return (
    <ThemeProvider>
      <div>
        <MyComponent />
        <ThemeSwitcherButton />
      </div>
    </ThemeProvider>
  );
}

export default App;
