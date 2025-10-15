import React from 'react';
import { Clipboard as ClipboardText, Moon, Sun, Paintbrush, HelpCircle } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';

interface HeaderProps {
  onShowManual: () => void;
}

const Header: React.FC<HeaderProps> = ({ onShowManual }) => {
  const { mode, setMode, isDark } = useTheme();

  const toggleTheme = () => {
    setMode(isDark ? 'light' : 'dark');
  };

  return (
    <header className="flex items-center justify-between px-4 py-3 bg-header border-b border-divider shadow-sm">
      <div className="flex items-center gap-2 animate-fade-in">
        <ClipboardText className="h-7 w-7 text-accent" />
        <h1 className="text-xl font-bold text-primary">ClipShare</h1>
      </div>

      <div className="flex items-center gap-2">
        <button
          onClick={onShowManual}
          className="p-2 rounded-full text-primary hover:bg-hover transition-all duration-200 hover:scale-110 active:scale-95"
          aria-label="How to use"
        >
          <HelpCircle className="h-5 w-5" />
        </button>

        <button
          onClick={toggleTheme}
          className="p-2 rounded-full text-primary hover:bg-hover transition-all duration-200 hover:scale-110 active:scale-95"
          aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
        >
          {isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
        </button>

        <a
          href="#theme-settings"
          className="p-2 rounded-full text-primary hover:bg-hover transition-all duration-200 hover:scale-110 active:scale-95"
          aria-label="Theme settings"
        >
          <Paintbrush className="h-5 w-5" />
        </a>
      </div>
    </header>
  );
};

export default Header;
