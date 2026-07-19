import { GenOptions } from '../types';

export const lowercaseSet = 'abcdefghijklmnopqrstuvwxyz';
export const uppercaseSet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
export const numberSet = '0123456789';
export const symbolSet = '!@#$%^&*()_+-=[]{}|;:\',./<>?';

function generateSpeakable(length: number): string {
  const vowels = ['a', 'e', 'i', 'o', 'u'];
  const consonants = ['b', 'c', 'd', 'f', 'g', 'h', 'j', 'k', 'l', 'm', 'n', 'p', 'r', 's', 't', 'v', 'w', 'x', 'z'];
  let result = '';
  let isConsonant = true;
  while (result.length < length) {
    if (isConsonant) {
      result += consonants[Math.floor(Math.random() * consonants.length)];
    } else {
      result += vowels[Math.floor(Math.random() * vowels.length)];
    }
    isConsonant = !isConsonant;
  }
  return result.substring(0, length);
}

export function generatePassword(options: GenOptions): string {
  if (options.easyToSpeak) {
    return generateSpeakable(options.length);
  }

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

  if (options.excludeChars) {
    for (const char of options.excludeChars) {
      charPool = charPool.split(char).join('');
    }
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
