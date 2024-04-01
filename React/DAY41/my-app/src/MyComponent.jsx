// MyComponent.js

import React from 'react';
import { useTheme } from './theme';

function MyComponent() {
  const { theme } = useTheme();

  return (
    <div style={theme}>
      {/* Appliquez les styles de thème ici */}
      <h1>Themed Content </h1>
    </div>
  );
}

export default MyComponent;
