# Kawerify Tech Passwords

A premium, highly-secure password generation utility. Designed to help users generate strong, cryptographically secure passwords and learn why password security is critical.

- **Developer**: Developed by [Kawerify Tech](https://kawerifytech.com).
- **License**: Managed by Kawerify Tech as a tool for public use. **Strictly free of charge and non-commercial**. No monetization is permitted.
- **Security**: Runs completely client-side in the browser. Saved passwords are kept in local storage and never transmitted to any servers.

## Features

- Cryptographically strong random passwords (`window.crypto.getRandomValues`).
- Syllable-based pronounceable passcodes (Easy to Speak).
- Real-time password audit metrics (Entropy calculations and crack speed models).
- Customizable character settings (exclude similar/confusing symbols, prefix/suffix affixes).
- Local storage vault (Save, search, show/hide passwords).
- File exporter (CSV spreadsheet, plain TXT log, and JSON backup).
- Educational Security Hub (Learn entropy, common pitfalls, and password managers).

## Installation

```bash
npm install
npm run dev
```

## Build & Deploy to Vercel

```bash
npm run build
```
Vite builds static distribution assets to `/dist` which are served seamlessly on Vercel.
