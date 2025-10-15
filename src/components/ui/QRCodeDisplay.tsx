import React from 'react';
import QRCode from 'react-qr-code';

interface QRCodeDisplayProps {
  value: string;
  size?: number;
}

const QRCodeDisplay: React.FC<QRCodeDisplayProps> = ({ value, size = 128 }) => {
  return (
    <div className="qr-code-container">
      <QRCode 
        value={value} 
        size={size} 
        level="H" 
        bgColor="#FFFFFF" 
        fgColor="#000000" 
      />
    </div>
  );
};

export default QRCodeDisplay;
