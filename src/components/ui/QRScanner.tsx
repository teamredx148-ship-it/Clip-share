import React, { useEffect, useRef } from 'react';
import { Html5Qrcode } from 'html5-qrcode';

interface QRScannerProps {
  onScan: (code: string) => void;
}

const QRScanner: React.FC<QRScannerProps> = ({ onScan }) => {
  const scannerRef = useRef<Html5Qrcode | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    // Initialize QR scanner
    if (!containerRef.current) return;
    
    const scannerId = 'qr-scanner';
    
    // Create scanner container if it doesn't exist
    let scannerElement = document.getElementById(scannerId);
    if (!scannerElement) {
      scannerElement = document.createElement('div');
      scannerElement.id = scannerId;
      containerRef.current.appendChild(scannerElement);
    }
    
    // Initialize scanner
    scannerRef.current = new Html5Qrcode(scannerId);
    
    // Start scanning
    scannerRef.current.start(
      { facingMode: 'environment' },
      { fps: 10, qrbox: { width: 250, height: 250 } },
      (decodedText) => {
        // Check if it's a valid 5-digit code
        if (/^\d{5}$/.test(decodedText)) {
          onScan(decodedText);
          if (scannerRef.current) {
            scannerRef.current.stop();
          }
        }
      },
      (errorMessage) => {
        console.log(errorMessage);
      }
    ).catch((err) => {
      console.error('Failed to start scanner', err);
    });
    
    // Cleanup function
    return () => {
      if (scannerRef.current && scannerRef.current.isScanning) {
        scannerRef.current.stop().catch((err) => {
          console.error('Failed to stop scanner', err);
        });
      }
    };
  }, [onScan]);
  
  return (
    <div className="qr-scanner-container" ref={containerRef}>
      <div className="flex justify-center items-center mb-4">
        <div className="w-64 h-64 border-2 border-dashed border-accent/50 rounded-lg flex items-center justify-center">
          <div id="qr-scanner"></div>
        </div>
      </div>
      <p className="text-center text-secondary text-sm">
        Position the QR code within the box to scan
      </p>
    </div>
  );
};

export default QRScanner;
