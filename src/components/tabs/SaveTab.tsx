import React, { useState } from 'react';
import { Copy, Save, Loader2, Clock, Shield } from 'lucide-react'; // Changed Trash2 to Shield for Privacy Mode
import { saveClipboardText } from '../../services/clipboardService';
import QRCodeDisplay from '../ui/QRCodeDisplay';
import toast from 'react-hot-toast';
import Confetti from 'react-confetti';

const EXPIRATION_OPTIONS = [
  { value: 1, label: '1 hour' },
  { value: 24, label: '1 day' },
  { value: 72, label: '3 days' },
  { value: 168, label: '7 days' }, // 7 days
  { value: 720, label: '30 days' } // 30 days
];

// Define Privacy Mode options
const PRIVACY_MODE_OPTIONS = [
  { value: 'default', label: 'Default' },
  { value: 'destroy-on-view', label: 'Destroy after viewing once' },
];

const SaveTab: React.FC = () => {
  const [text, setText] = useState('');
  const [savedCode, setSavedCode] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [expirationHours, setExpirationHours] = useState(168); // Default to 7 days
  const [privacyMode, setPrivacyMode] = useState<'default' | 'destroy-on-view'>('default'); // State for Privacy Mode dropdown

  const handleSave = async () => {
    if (!text.trim()) {
      toast.error('Please enter some text to save');
      return;
    }

    setIsLoading(true);

    try {
      // Pass privacyMode state to the service function
      const code = await saveClipboardText(text, expirationHours, privacyMode);
      setSavedCode(code);
      setShowConfetti(true);
      toast.success('Text saved successfully!');

      setTimeout(() => {
        setShowConfetti(false);
      }, 3000);
    } catch (error) {
      console.error('Error saving text:', error);
      toast.error('Failed to save text. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const copyCode = async () => {
    if (savedCode) {
      try {
        await navigator.clipboard.writeText(savedCode);
        toast.success('Code copied to clipboard!');
      } catch (err) {
        console.error('Failed to copy code:', err);
        toast.error('Failed to copy code. Please copy manually.');
      }
    }
  };

  const resetForm = () => {
    setText('');
    setSavedCode(null);
    setExpirationHours(168);
    setPrivacyMode('default'); // Reset privacy mode state
  };

  return (
    <div className="p-4 md:p-6 flex flex-col gap-4">
      {showConfetti && (
        <Confetti
          width={window.innerWidth}
          height={window.innerHeight}
          recycle={false}
          numberOfPieces={200}
        />
      )}

      <h2 className="text-xl font-bold text-primary mb-2">Save Text to Clipboard</h2>

      {!savedCode ? (
        <>
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <label htmlFor="cliptext" className="text-sm font-medium text-secondary">
                Enter text to save
              </label>
              <textarea
                id="cliptext"
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Type or paste your text here..."
                className="p-3 rounded-lg border border-input bg-background text-primary min-h-[150px] focus:outline-none focus:ring-2 focus:ring-accent/50"
                disabled={isLoading}
              />
            </div>

            {/* Expiration and Privacy Mode Row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Expiration Dropdown */}
              <div className="flex flex-col gap-2">
                <label htmlFor="expiration" className="text-sm font-medium text-secondary flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  Expiration period
                </label>
                <select
                  id="expiration"
                  value={expirationHours}
                  onChange={(e) => setExpirationHours(Number(e.target.value))}
                  className="p-3 rounded-lg border border-input bg-background text-primary focus:outline-none focus:ring-2 focus:ring-accent/50"
                  disabled={isLoading}
                >
                  {EXPIRATION_OPTIONS.map(option => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Privacy Mode Dropdown */}
              <div className="flex flex-col gap-2">
                <label htmlFor="privacyMode" className="text-sm font-medium text-secondary flex items-center gap-2">
                  <Shield className="h-4 w-4" />
                  Privacy mode
                </label>
                <select
                  id="privacyMode"
                  value={privacyMode}
                  onChange={(e) => setPrivacyMode(e.target.value as 'default' | 'destroy-on-view')}
                  className="p-3 rounded-lg border border-input bg-background text-primary focus:outline-none focus:ring-2 focus:ring-accent/50"
                  disabled={isLoading}
                >
                  {PRIVACY_MODE_OPTIONS.map(option => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          <button
            onClick={handleSave}
            disabled={isLoading || !text.trim()}
            className="flex items-center justify-center gap-2 bg-accent hover:bg-accent-hover text-white py-3 px-4 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed mt-2"
          >
            {isLoading ? (
              <Loader2 className="h-5 w-5 animate-spin" />
            ) : (
              <Save className="h-5 w-5" />
            )}
            <span>{isLoading ? 'Saving Text...' : 'Send to Online Clipboard'}</span>
          </button>
        </>
      ) : (
        <div className="flex flex-col items-center gap-6 py-4">
          <div className="p-6 bg-card rounded-xl shadow-sm border border-divider flex flex-col items-center w-full max-w-md mx-auto">
            <p className="text-secondary mb-2">Your unique code:</p>
            <div className="flex items-center gap-3 mb-6">
              <span className="text-3xl font-bold tracking-wider text-primary">
                {savedCode}
              </span>
              <button
                onClick={copyCode}
                className="p-2 rounded-lg hover:bg-hover text-primary transition-colors"
                aria-label="Copy code"
              >
                <Copy className="h-5 w-5" />
              </button>
            </div>

            <div className="flex flex-col items-center gap-3">
              <p className="text-secondary mb-2">Scan this QR code:</p>
              <div className="p-4 bg-white rounded-xl">
                <QRCodeDisplay value={savedCode} size={200} />
              </div>
              <p className="text-xs text-secondary mt-2 text-center">
                {privacyMode === 'destroy-on-view'
                  ? 'This code will be destroyed after viewing once.'
                  : `This code will expire in ${EXPIRATION_OPTIONS.find(opt => opt.value === expirationHours)?.label}.`}
              </p>
            </div>
          </div>

          <button
            onClick={resetForm}
            className="text-accent hover:text-accent-hover transition-colors self-center"
          >
            Save another text
          </button>
        </div>
      )}
    </div>
  );
};

export default SaveTab;
