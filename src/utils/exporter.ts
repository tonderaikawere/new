import { SavedPassword } from '../types';

function triggerDownload(content: string, mimeType: string, filename: string) {
  const blob = new Blob([content], { type: mimeType });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

export function exportToTxt(passwords: SavedPassword[]) {
  let fileText = '===========================================\n';
  fileText += '   KAWERIFY TECH - SAVED PASSWORD HISTORY  \n';
  fileText += '===========================================\n';
  fileText += 'Generated at: ' + new Date().toLocaleString() + '\n';
  fileText += 'License: Free of charge - Non-Commercial\n';
  fileText += '===========================================\n\n';

  passwords.forEach((item, idx) => {
    fileText += `[${idx + 1}] Label: ${item.label}\n`;
    fileText += `    Password: ${item.password}\n`;
    fileText += `    Settings: ${item.options}\n`;
    fileText += `    Created:  ${new Date(item.timestamp).toLocaleString()}\n`;
    fileText += '-------------------------------------------\n';
  });

  triggerDownload(fileText, 'text/plain;charset=utf-8', 'kawerify_passwords.txt');
}

export function exportToCsv(passwords: SavedPassword[]) {
  let csvContent = 'Label,Password,Settings,Created Date\n';
  
  passwords.forEach(item => {
    const escapedLabel = '"' + item.label.replace(/"/g, '""') + '"';
    const escapedPwd = '"' + item.password.replace(/"/g, '""') + '"';
    const escapedOpts = '"' + item.options.replace(/"/g, '""') + '"';
    const dateStr = '"' + new Date(item.timestamp).toLocaleString() + '"';
    
    csvContent += `${escapedLabel},dots${escapedPwd},dots${escapedOpts},dots${dateStr}\n`;
  });

  triggerDownload(csvContent, 'text/csv;charset=utf-8', 'kawerify_passwords.csv');
}
