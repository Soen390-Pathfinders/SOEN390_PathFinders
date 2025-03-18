// useTheme.ts
//custom hook for theme context for dark/light theme
import { useContext } from "react";
import ThemeContext from "../app/components/context/ThemeContext";

const useTheme = () => {
  const context = useContext(ThemeContext);
  
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }

  return context; // { theme, toggleTheme }
};

export default useTheme;
