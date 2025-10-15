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
    <header className="flex items-center justify-between px-4 py-3 bg-header border-b border-divider">
      <div className="flex items-center gap-2">
        <ClipboardText className="h-7 w-7 text-accent" />
        <h1 className="text-xl font-bold text-primary">ClipShare</h1>
      </div>

      <div className="flex items-center gap-2">
        <button
          onClick={onShowManual}
          className="p-2 rounded-full text-primary hover:bg-hover transition-colors"
          aria-label="How to use"
        >
          <HelpCircle className="h-5 w-5" />
        </button>

        <button
          onClick={toggleTheme}
          className="p-2 rounded-full text-primary hover:bg-hover transition-colors"
          aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
        >
          {isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
        </button>

        <a
          href="#theme-settings"
          className="p-2 rounded-full text-primary hover:bg-hover transition-colors"
          aria-label="Theme settings"
        >
          <Paintbrush className="h-5 w-5" />
        </a>
      </div>
    </header>
  );
};

export default Header;
