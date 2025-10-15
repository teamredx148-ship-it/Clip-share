import React, { createContext, useState, useContext, useEffect } from 'react';

type ThemeMode = 'light' | 'dark' | 'system';
type ThemeAccent = 'blue' | 'purple' | 'teal' | 'amber' | 'rose';

interface ThemeContextType {
  mode: ThemeMode;
  accent: ThemeAccent;
  setMode: (mode: ThemeMode) => void;
  setAccent: (accent: ThemeAccent) => void;
  isDark: boolean;
}

const ThemeContext = createContext<ThemeContextType>({
  mode: 'system',
  accent: 'blue',
  setMode: () => {},
  setAccent: () => {},
  isDark: false,
});

export const useTheme = () => useContext(ThemeContext);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [mode, setMode] = useState<ThemeMode>(() => {
    const savedMode = localStorage.getItem('theme-mode');
    return (savedMode as ThemeMode) || 'system';
  });
  
  const [accent, setAccent] = useState<ThemeAccent>(() => {
    const savedAccent = localStorage.getItem('theme-accent');
    return (savedAccent as ThemeAccent) || 'blue';
  });
  
  const [isDark, setIsDark] = useState(false);
  
  // Update localStorage when theme changes
  useEffect(() => {
    localStorage.setItem('theme-mode', mode);
  }, [mode]);
  
  useEffect(() => {
    localStorage.setItem('theme-accent', accent);
  }, [accent]);
  
  // Apply dark/light mode
  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove('light-theme', 'dark-theme');
    
    const systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const shouldBeDark = mode === 'dark' || (mode === 'system' && systemDark);
    
    if (shouldBeDark) {
      root.classList.add('dark-theme');
      setIsDark(true);
    } else {
      root.classList.add('light-theme');
      setIsDark(false);
    }
  }, [mode]);
  
  // Apply accent color
  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove('accent-blue', 'accent-purple', 'accent-teal', 'accent-amber', 'accent-rose');
    root.classList.add(`accent-${accent}`);
  }, [accent]);
  
  return (
    <ThemeContext.Provider value={{ mode, accent, setMode, setAccent, isDark }}>
      {children}
    </ThemeContext.Provider>
  );
};
