//Context to share state for dark/light theme across all components
import React, { createContext, useState, useEffect, ReactNode } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Define the shape of the context data
type ThemeContextType = {
  theme: string;
  toggleTheme: (newTheme: string) => void;
};

// Create the context with a default value of `undefined`
const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

// Define props for the ThemeProvider
type ThemeProviderProps = {
  children: ReactNode;
};

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const [theme, setTheme] = useState<string>("light");

  useEffect(() => {
    // Load saved theme from storage
    const getTheme = async () => {
      try {
        const savedTheme = await AsyncStorage.getItem("theme");
        if (savedTheme) {
          setTheme(savedTheme);
        }
      } catch (error) {
        console.log("Error loading theme:", error);
      }
    };
    getTheme();
  }, []);

  const toggleTheme = (newTheme) => {
    setTheme(newTheme);
    AsyncStorage.setItem("theme", newTheme);
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
export default ThemeContext;
