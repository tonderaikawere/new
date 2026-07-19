import { GenOptions } from '../types';

export const lowercaseSet = 'abcdefghijklmnopqrstuvwxyz';
export const uppercaseSet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
export const numberSet = '0123456789';
export const symbolSet = '!@#$%^&*()_+-=[]{}|;:\',./<>?';

export function generatePassword(options: GenOptions): string {
  let charPool = '';
  if (options.lowercase) charPool += lowercaseSet;
  if (options.uppercase) charPool += uppercaseSet;
  if (options.numbers) charPool += numberSet;
  if (options.symbols) charPool += symbolSet;
  
  if (options.excludeAmbiguous) {
    const ambiguous = /[{}[\]()\/\\'"`~,;:.<>]/g;
    charPool = charPool.replace(ambiguous, '');
  }
  
  if (options.easyToRead) {
    const similar = /[l1Io0O5S2Z]/g;
    charPool = charPool.replace(similar, '');
  }
  
  if (charPool === '') return '';
  
  const array = new Uint32Array(options.length);
  window.crypto.getRandomValues(array);
  
  let password = '';
  for (let i = 0; i < options.length; i++) {
    password += charPool[array[i] % charPool.length];
  }
  
  return password;
}
