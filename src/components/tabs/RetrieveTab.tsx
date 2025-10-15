import React, { useState } from 'react';
import { ClipboardCopy, Loader2, QrCode, Clock, X, AlertTriangle } from 'lucide-react'; // Added AlertTriangle
import { getClipboardText, ClipboardItem } from '../../services/clipboardService';
import QRScanner from '../ui/QRScanner';
import toast from 'react-hot-toast';

const RetrieveTab: React.FC = () => {
  const [code, setCode] = useState('');
  const [retrievedData, setRetrievedData] = useState<ClipboardItem | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [scannerOpen, setScannerOpen] = useState(false);

  const attemptCopyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      toast.success('Text copied to clipboard!');
    } catch (err) {
      console.error('Failed to copy text automatically:', err);
      toast.error('Auto-copy failed. Please copy the text manually.', { duration: 5000 });
    }
  };

  const handleRetrieve = async () => {
    if (!code.trim() || code.length !== 5) {
      toast.error('Please enter a valid 5-digit code');
      return;
    }

    setIsLoading(true);

    try {
      const clipData = await getClipboardText(code);
      setRetrievedData(clipData);

      // Attempt auto copy to clipboard
      await attemptCopyToClipboard(clipData.text);

    } catch (error: any) {
      console.error('Error retrieving text:', error);
      // Avoid showing duplicate error if it's the clipboard error after successful retrieval
      if (!(error instanceof DOMException && error.name === 'NotAllowedError')) {
         toast.error(error.message || 'Failed to retrieve text');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const copyToClipboard = () => {
    if (retrievedData) {
      attemptCopyToClipboard(retrievedData.text);
    }
  };

  const resetForm = () => {
    setCode('');
    setRetrievedData(null);
  };

  const handleScanSuccess = (scannedCode: string) => {
    // Basic validation for scanned code format (e.g., 5 digits)
    if (/^\d{5}$/.test(scannedCode)) {
      setCode(scannedCode);
      setScannerOpen(false);
      // Auto retrieve after successful scan
      setTimeout(() => {
        handleRetrieve();
      }, 300);
    } else {
       toast.error('Invalid QR code scanned. Expected a 5-digit code.');
       // Keep scanner open or close it based on preference
       // setScannerOpen(false);
    }
  };

  const formatTimeLeft = (expiresAt: number): string => {
    const now = Date.now();
    const timeLeft = expiresAt - now;

    if (timeLeft <= 0) {
      return 'Expired';
    }

    const minutes = Math.floor(timeLeft / (1000 * 60));
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (days > 0) {
      return `${days} day${days > 1 ? 's' : ''}`;
    } else if (hours > 0) {
      return `${hours} hour${hours > 1 ? 's' : ''}`;
    } else if (minutes > 0) {
       return `${minutes} minute${minutes > 1 ? 's' : ''}`;
    } else {
       return 'Less than a minute';
    }
  };

  return (
    <div className="p-4 md:p-6 flex flex-col gap-4">
      <h2 className="text-xl font-bold text-primary mb-2">Retrieve Text</h2>

      {!retrievedData ? (
        <>
          <div className="flex flex-col gap-2">
            <label htmlFor="clipcode" className="text-sm font-medium text-secondary">
              Enter 5-digit code
            </label>
            <div className="flex gap-2">
              <input
                id="clipcode"
                type="text"
                inputMode="numeric" // Helps mobile users get numeric keyboard
                value={code}
                onChange={(e) => {
                  const value = e.target.value.replace(/[^0-9]/g, '');
                  if (value.length <= 5) {
                    setCode(value);
                  }
                }}
                placeholder="12345"
                className="flex-1 p-3 rounded-lg border border-input bg-background text-primary focus:outline-none focus:ring-2 focus:ring-accent/50"
                disabled={isLoading}
                maxLength={5}
                pattern="[0-9]*"
              />
              <button
                onClick={() => setScannerOpen(true)}
                className="p-3 rounded-lg bg-hover text-primary border border-input hover:bg-card transition-colors"
                aria-label="Scan QR code"
              >
                <QrCode className="h-5 w-5" />
              </button>
            </div>
          </div>

          <button
            onClick={handleRetrieve}
            disabled={isLoading || code.length !== 5}
            className="flex items-center justify-center gap-2 bg-accent hover:bg-accent-hover text-white py-3 px-4 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <Loader2 className="h-5 w-5 animate-spin" />
            ) : (
              <ClipboardCopy className="h-5 w-5" />
            )}
            <span>{isLoading ? 'Retrieving...' : 'Retrieve Text'}</span>
          </button>

          {scannerOpen && (
            <div className="fixed inset-0 bg-background/90 backdrop-blur-sm z-50 flex flex-col items-center justify-center p-4">
              <div className="bg-card max-w-md w-full rounded-xl shadow-lg border border-divider overflow-hidden">
                <div className="p-4 border-b border-divider flex justify-between items-center">
                  <h3 className="text-lg font-semibold text-primary">Scan QR Code</h3>
                   <button
                    onClick={() => setScannerOpen(false)}
                    className="p-1 rounded-full hover:bg-hover text-secondary transition-colors"
                    aria-label="Close scanner"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>
                <div className="p-4">
                  <QRScanner onScan={handleScanSuccess} />
                </div>
                <div className="p-4 border-t border-divider flex justify-end">
                  <button
                    onClick={() => setScannerOpen(false)}
                    className="px-4 py-2 bg-hover text-primary rounded-lg hover:bg-card transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          )}
        </>
      ) : (
        <div className="flex flex-col gap-4">
          {/* Warning Message for Destroy-on-View */}
          {retrievedData.privacyMode === 'destroy-on-view' && (
            <div className="flex items-center gap-3 p-4 bg-yellow-100 border border-yellow-400 text-yellow-800 rounded-lg" role="alert">
              <AlertTriangle className="h-5 w-5 flex-shrink-0" />
              <p className="text-sm font-medium">
                Warning: This text is set to be destroyed after viewing once.
              </p>
            </div>
          )}

          <div className="p-4 bg-card rounded-lg border border-divider">
            <div className="flex justify-between items-start mb-3">
              <div>
                <h3 className="text-sm font-medium text-secondary">Retrieved Text</h3>
                <div className="flex items-center gap-2 text-xs text-tertiary flex-wrap">
                  <span>Code: {code}</span>
                  <span className="hidden sm:inline">•</span>
                  <span className="flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    {retrievedData.privacyMode === 'destroy-on-view'
                      ? 'One-time view'
                      : `Expires in ${formatTimeLeft(retrievedData.expiresAt)}`}
                  </span>
                </div>
              </div>
              <button
                onClick={copyToClipboard}
                className="p-2 rounded-lg hover:bg-hover text-primary transition-colors flex-shrink-0"
                aria-label="Copy text"
              >
                <ClipboardCopy className="h-5 w-5" />
              </button>
            </div>
            {/* Selectable text area */}
            <textarea
              readOnly
              value={retrievedData.text}
              className="w-full p-3 rounded-lg bg-background border border-divider max-h-[300px] overflow-auto whitespace-pre-wrap text-primary focus:outline-none focus:ring-1 focus:ring-accent/50 font-mono text-sm"
              rows={Math.min(10, retrievedData.text.split('\n').length)} // Adjust rows based on content
              onClick={(e) => (e.target as HTMLTextAreaElement).select()} // Select all on click
            />
          </div>

          <button
            onClick={resetForm}
            className="text-accent hover:text-accent-hover transition-colors self-center"
          >
            Retrieve another text
          </button>
        </div>
      )}
    </div>
  );
};

export default RetrieveTab;
