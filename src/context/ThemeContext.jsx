import { createContext, useContext, useEffect, useState } from "react";
import React from "react";

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState("light");
  const [hasLoaded, setHasLoaded] = useState(false);

  // Load from localStorage (ONLY once, even in Strict Mode)
  useEffect(() => {
    const saved = localStorage.getItem("theme") || "light";
    setTheme(saved);
    setHasLoaded(true);
  }, []);

  // Apply theme ONLY after initial load
  useEffect(() => {
    if (!hasLoaded) return; // ⛔️ جلوگیری از اجرای دوباره در Strict Mode

    document.documentElement.classList.toggle("dark", theme === "dark");
    localStorage.setItem("theme", theme);
  }, [theme, hasLoaded]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);