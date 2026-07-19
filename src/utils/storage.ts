import type { SavedPassword } from '../types';

const STORAGE_KEY = 'kawerify_tech_passwords';

export function loadSavedPasswords(): SavedPassword[] {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch (e) {
    console.error('Failed to load passwords from localStorage', e);
    return [];
  }
}

export function savePasswordsToStorage(passwords: SavedPassword[]): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(passwords));
  } catch (e) {
    console.error('Failed to save passwords to localStorage', e);
  }
}
