import React from 'react';
import { Save, Search } from 'lucide-react';

interface TabNavProps {
  activeTab: 'save' | 'retrieve';
  setActiveTab: (tab: 'save' | 'retrieve') => void;
}

const TabNav: React.FC<TabNavProps> = ({ activeTab, setActiveTab }) => {
  return (
    <div className="flex w-full border-b border-divider">
      <button
        onClick={() => setActiveTab('save')}
        className={`flex-1 py-3 px-4 flex items-center justify-center gap-2 transition-colors ${
          activeTab === 'save' 
            ? 'text-accent border-b-2 border-accent' 
            : 'text-secondary hover:text-primary hover:bg-hover'
        }`}
        aria-selected={activeTab === 'save'}
      >
        <Save className="h-5 w-5" />
        <span className="font-medium">Save</span>
      </button>
      
      <button
        onClick={() => setActiveTab('retrieve')}
        className={`flex-1 py-3 px-4 flex items-center justify-center gap-2 transition-colors ${
          activeTab === 'retrieve' 
            ? 'text-accent border-b-2 border-accent' 
            : 'text-secondary hover:text-primary hover:bg-hover'
        }`}
        aria-selected={activeTab === 'retrieve'}
      >
        <Search className="h-5 w-5" />
        <span className="font-medium">Retrieve</span>
      </button>
    </div>
  );
};

export default TabNav;
