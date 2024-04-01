import React, { createContext, useReducer, useContext } from 'react';

const lightTheme = {
  backgroundColor: 'white',
  color: 'black',
};

const darkTheme = {
  backgroundColor: 'black',
  color: 'white',
};

function themeReducer(state, action) {
  switch (action.type) {
    case 'TOGGLE_THEME':
      return state === lightTheme ? darkTheme : lightTheme;
    default:
      return state;
  }
}

const ThemeContext = createContext();

function ThemeProvider({ children }) {
  const [theme, dispatch] = useReducer(themeReducer, lightTheme);

  const toggleTheme = () => dispatch({ type: 'TOGGLE_THEME' });

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

function useTheme() {
  return useContext(ThemeContext);
}

export { ThemeProvider, useTheme };
