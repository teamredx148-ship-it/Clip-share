import React, { useState } from 'react';
import { Toaster } from 'react-hot-toast';
import { ThemeProvider } from './context/ThemeContext';
import { X } from 'lucide-react';
import Header from './components/layout/Header';
import TabNav from './components/tabs/TabNav';
import SaveTab from './components/tabs/SaveTab';
import RetrieveTab from './components/tabs/RetrieveTab';
import ThemeSettings from './components/ui/ThemeSettings';
import './styles/theme.css';
import UserManual from './components/layout/UserManual'; // Import the new component

function App() {
  const [activeTab, setActiveTab] = useState<'save' | 'retrieve'>('save');
  const [showManual, setShowManual] = useState(false);

  return (
    <ThemeProvider>
      <div className="flex flex-col min-h-screen bg-background">
        <Toaster 
          position="top-center"
          toastOptions={{
            duration: 3000,
            style: {
              background: 'var(--color-card)',
              color: 'var(--color-primary)',
              border: '1px solid var(--color-divider)'
            },
          }} 
        />
        
        <Header onShowManual={() => setShowManual(true)} />

        <main className="flex-1 container mx-auto max-w-3xl px-4 py-6">
          <div className="bg-card rounded-xl shadow-sm border border-divider overflow-hidden">
            <TabNav activeTab={activeTab} setActiveTab={setActiveTab} />
            
            {activeTab === 'save' ? (
              <SaveTab />
            ) : (
              <RetrieveTab />
            )}
          </div>
          
          <div className="mt-8">
            <ThemeSettings />
          </div>
        </main>
        
        <footer className="py-4 text-center text-tertiary text-sm">
          <p>ClipShare &copy; {new Date().getFullYear()} • Your text expires after 7 days</p>
        </footer>
      </div>

      {/* User Manual Modal */}
      {showManual && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-card rounded-xl shadow-xl border border-divider max-w-2xl w-full max-h-[80vh] overflow-y-auto relative">
            <button
              onClick={() => setShowManual(false)}
              className="absolute top-3 right-3 p-2 rounded-full hover:bg-hover text-secondary transition-colors z-10"
              aria-label="Close user manual"
            >
              <X className="h-5 w-5" />
            </button>
            <div className="p-6 md:p-8">
              <UserManual />
            </div>
          </div>
        </div>
      )}
    </ThemeProvider>
  );
}

export default App;
