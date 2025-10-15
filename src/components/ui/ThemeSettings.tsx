import React from 'react';
import { X } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';

const ThemeSettings: React.FC = () => {
  const { mode, accent, setMode, setAccent } = useTheme();
  
  return (
    <div className="p-4 md:p-6 bg-card rounded-xl shadow-lg border border-divider" id="theme-settings">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-primary">Theme Settings</h2>
        <a 
          href="#" 
          className="p-2 rounded-full hover:bg-hover text-secondary transition-colors"
          aria-label="Close theme settings"
        >
          <X className="h-5 w-5" />
        </a>
      </div>
      
      <div className="space-y-6">
        <div>
          <h3 className="text-sm font-medium text-secondary mb-3">Display Mode</h3>
          <div className="grid grid-cols-3 gap-2">
            {['light', 'dark', 'system'].map((themeMode) => (
              <button
                key={themeMode}
                onClick={() => setMode(themeMode as any)}
                className={`py-2 px-3 rounded-lg border transition-all ${
                  mode === themeMode
                    ? 'border-accent text-accent bg-accent/10'
                    : 'border-divider text-secondary hover:border-input'
                }`}
              >
                {themeMode.charAt(0).toUpperCase() + themeMode.slice(1)}
              </button>
            ))}
          </div>
        </div>
        
        <div>
          <h3 className="text-sm font-medium text-secondary mb-3">Accent Color</h3>
          <div className="flex flex-wrap gap-3">
            {[
              { name: 'blue', color: '#3b82f6' },
              { name: 'purple', color: '#8b5cf6' },
              { name: 'teal', color: '#14b8a6' },
              { name: 'amber', color: '#f59e0b' },
              { name: 'rose', color: '#f43f5e' },
            ].map((color) => (
              <button
                key={color.name}
                onClick={() => setAccent(color.name as any)}
                className={`w-8 h-8 rounded-full border-2 transition-all ${
                  accent === color.name ? 'border-primary scale-110' : 'border-transparent'
                }`}
                style={{ backgroundColor: color.color }}
                aria-label={`${color.name} accent color`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ThemeSettings;
