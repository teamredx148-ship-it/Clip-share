import React from 'react';

const UserManual: React.FC = () => {
  return (
    <div className="prose prose-sm md:prose-base dark:prose-invert max-w-none text-primary">
      <h2 className="text-2xl font-bold mb-4 text-primary">How to Use ClipShare</h2>

      <h3 className="text-lg font-semibold mt-6 mb-2 text-primary">Saving Text</h3>
      <ol className="list-decimal list-inside space-y-1 text-secondary">
        <li>Navigate to the <strong>Save</strong> tab.</li>
        <li>Enter or paste the text you want to share into the text area.</li>
        <li>Click the <strong>Save Text & Generate QR</strong> button.</li>
        <li>A unique QR code will be generated.</li>
        <li>You can copy the text ID or scan the QR code on another device.</li>
      </ol>

      <h3 className="text-lg font-semibold mt-6 mb-2 text-primary">Retrieving Text</h3>
      <ol className="list-decimal list-inside space-y-1 text-secondary">
        <li>Navigate to the <strong>Retrieve</strong> tab.</li>
        <li>You have two options:</li>
        <ul className="list-disc list-inside ml-4 space-y-1">
          <li><strong>Scan QR Code:</strong> Click the "Scan QR Code" button and allow camera access. Scan the QR code generated on the saving device.</li>
          <li><strong>Enter ID:</strong> Manually type or paste the text ID into the input field and click "Retrieve Text".</li>
        </ul>
        <li>The shared text will appear in the text area below.</li>
        <li>You can use the "Copy to Clipboard" button to easily copy the retrieved text.</li>
      </ol>

      <h3 className="text-lg font-semibold mt-6 mb-2 text-primary">Theme Customization</h3>
      <p className="text-secondary">
        You can customize the appearance of ClipShare:
      </p>
      <ul className="list-disc list-inside space-y-1 text-secondary">
        <li>Click the Moon/Sun icon in the header to toggle between Light and Dark mode instantly.</li>
        <li>Click the Paintbrush icon or scroll down to the "Theme Settings" section.</li>
        <li>Choose your preferred display mode (Light, Dark, or System default).</li>
        <li>Select an accent color to personalize the look.</li>
      </ul>

      <h3 className="text-lg font-semibold mt-6 mb-2 text-primary">Important Notes</h3>
      <ul className="list-disc list-inside space-y-1 text-secondary">
        <li>Shared text automatically expires and is deleted after <strong>7 days</strong>.</li>
        <li>Ensure you have a stable internet connection for saving and retrieving text.</li>
        <li>When scanning QR codes, you might need to grant camera permissions to your browser.</li>
      </ul>
    </div>
  );
};

export default UserManual;
