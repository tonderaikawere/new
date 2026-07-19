import type { GenOptions } from '../types';

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
  let basePwd = '';
  if (options.easyToSpeak) {
    basePwd = generateSpeakable(options.length);
  } else {
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
    
    for (let i = 0; i < options.length; i++) {
      basePwd += charPool[array[i] % charPool.length];
    }
  }

  const prefix = options.prefix || '';
  const suffix = options.suffix || '';
  return prefix + basePwd + suffix;
}

export function getPoolSize(options: GenOptions): number {
  if (options.easyToSpeak) return 24;
  
  let pool = '';
  if (options.lowercase) pool += lowercaseSet;
  if (options.uppercase) pool += uppercaseSet;
  if (options.numbers) pool += numberSet;
  if (options.symbols) pool += symbolSet;
  
  if (options.excludeAmbiguous) {
    const ambiguous = /[{}[\]()\/\\'"`~,;:.<>]/g;
    pool = pool.replace(ambiguous, '');
  }
  if (options.easyToRead) {
    const similar = /[l1Io0O5S2Z]/g;
    pool = pool.replace(similar, '');
  }
  if (options.excludeChars) {
    for (const char of options.excludeChars) {
      pool = pool.split(char).join('');
    }
  }
  return pool.length;
}

export function calculateEntropy(pwdLength: number, poolSize: number): number {
  if (pwdLength <= 0 || poolSize <= 1) return 0;
  return pwdLength * Math.log2(poolSize);
}

export function getStrengthInfo(entropy: number) {
  if (entropy === 0) return { label: 'Invalid Option Selection', color: '#f44336', value: 0 };
  if (entropy < 40) return { label: 'Weak (Vulnerable)', color: '#f44336', value: 25 };
  if (entropy < 60) return { label: 'Medium (Adequate)', color: '#ff9800', value: 50 };
  if (entropy < 85) return { label: 'Strong (Highly Secure)', color: '#00e5ff', value: 75 };
  return { label: 'Very Strong (Unbreakable)', color: '#00e676', value: 100 };
}
