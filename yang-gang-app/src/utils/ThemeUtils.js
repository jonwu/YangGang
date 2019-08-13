import * as React from "react";
import { StyleSheet } from "react-native";
import { useSelector } from "react-redux";
import collections from "./themes";
import generateGlobalStyles from "./gstyles";

const ThemeContext = React.createContext({
  theme: null,
  gstyles: null
});

const ThemeContextProvider = ({ children }) => {
  const themeId = useSelector(state => state.settings.theme);
  const theme = collections[themeId];
  const gstyles = generateGlobalStyles(theme);
  return (
    <ThemeContext.Provider value={{ theme, gstyles }}>
      {children}
    </ThemeContext.Provider>
  );
};

const useThemeKit = generateStyles => {
  const { theme, gstyles } = React.useContext(ThemeContext);
  return {
    theme,
    gstyles,
    styles:
      generateStyles != null ? StyleSheet.create(generateStyles(theme)) : null
  };
};

export { ThemeContext, ThemeContextProvider, useThemeKit };
