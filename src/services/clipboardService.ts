import { database } from '../firebase/config';
import { ref, set, get, remove } from 'firebase/database';

export interface ClipboardItem {
  text: string;
  createdAt: number;
  expiresAt: number;
  expirationPeriod: number; // in hours
  privacyMode: 'default' | 'destroy-on-view'; // Changed from boolean destroyOnView to privacyMode string
}

// Generate a random 5-digit code that doesn't exist yet
export const generateUniqueCode = async (): Promise<string> => {
  let code: string;
  let exists: boolean = true;

  // Try until we find a code that doesn't exist
  while (exists) {
    code = Math.floor(10000 + Math.random() * 90000).toString();
    const snapshot = await get(ref(database, `clips/${code}`));
    exists = snapshot.exists();
  }

  return code!;
};

// Save text to Firebase with a unique code and privacy mode
export const saveClipboardText = async (
  text: string,
  expirationHours: number,
  privacyMode: 'default' | 'destroy-on-view' // Changed parameter type
): Promise<string> => {
  try {
    if (!text.trim()) {
      throw new Error('Text cannot be empty');
    }

    const code = await generateUniqueCode();
    const now = Date.now();
    const expiresAt = now + (expirationHours * 60 * 60 * 1000);

    const clipData: ClipboardItem = {
      text,
      createdAt: now,
      expiresAt,
      expirationPeriod: expirationHours,
      privacyMode, // Store the privacy mode
    };

    await set(ref(database, `clips/${code}`), clipData);
    return code;
  } catch (error) {
    console.error('Error saving clipboard text:', error);
    throw error;
  }
};

// Retrieve text from Firebase using a code and handle privacy mode
export const getClipboardText = async (code: string): Promise<ClipboardItem> => {
  const clipRef = ref(database, `clips/${code}`);

  try {
    if (!code || code.length !== 5 || !/^\d+$/.test(code)) {
      throw new Error('Invalid code format');
    }

    const snapshot = await get(clipRef);

    if (!snapshot.exists()) {
      throw new Error('Clip not found');
    }

    const clipData = snapshot.val() as ClipboardItem;

    // Check if clip has expired
    if (Date.now() > clipData.expiresAt) {
      // Optionally remove expired clips here or use a separate cleanup function
      // await remove(clipRef);
      throw new Error('This clip has expired');
    }

    // If privacy mode is 'destroy-on-view', remove the clip AFTER retrieving data
    if (clipData.privacyMode === 'destroy-on-view') {
      try {
        await remove(clipRef);
        console.log(`Clip ${code} destroyed after viewing.`);
      } catch (removeError) {
        // Log error but proceed with returning data, as retrieval was successful
        console.error(`Failed to remove clip ${code} after viewing:`, removeError);
      }
    }

    return clipData;
  } catch (error) {
    console.error('Error retrieving clipboard text:', error);
    // Re-throw the specific error for handling in the UI
    throw error;
  }
};
