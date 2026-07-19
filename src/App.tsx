import { useState, useEffect } from 'react';
import { ThemeProvider, CssBaseline, Container, Grid2 as Grid, Box, Alert, Snackbar } from '@mui/material';
import theme from './theme';
import type { GenOptions, SavedPassword, PresetName } from './types';
import BrandingHeader from './components/BrandingHeader';
import Footer from './components/Footer';
import EducationalHub from './components/EducationalHub';
import PasswordGenerator from './components/PasswordGenerator';
import SavedPasswords from './components/SavedPasswords';
import StandaloneAnalyzer from './components/StandaloneAnalyzer';
import SaveLabelDialog from './components/SaveLabelDialog';
import { generatePassword, getPoolSize, calculateEntropy, getStrengthInfo } from './utils/generator';
import { loadSavedPasswords, savePasswordsToStorage } from './utils/storage';

const initialOptions: GenOptions = {
  length: 16,
  uppercase: true,
  lowercase: true,
  numbers: true,
  symbols: true,
  excludeAmbiguous: false,
  easyToRead: false,
  easyToSpeak: false,
  excludeChars: '',
  prefix: '',
  suffix: '',
};

export default function App() {
  const [options, setOptions] = useState<GenOptions>(initialOptions);
  const [password, setPassword] = useState('');
  const [savedPasswords, setSavedPasswords] = useState<SavedPassword[]>([]);
  const [isSaveDialogOpen, setIsSaveDialogOpen] = useState(false);
  
  const [alertInfo, setAlertInfo] = useState<{ open: boolean; message: string; severity: 'success' | 'info' | 'warning' | 'error' }>({
    open: false,
    message: '',
    severity: 'success'
  });

  useEffect(() => {
    setSavedPasswords(loadSavedPasswords());
  }, []);

  const triggerAlert = (message: string, severity: 'success' | 'info' | 'warning' | 'error' = 'success') => {
    setAlertInfo({ open: true, message, severity });
  };

  const handleGenerate = () => {
    const pwd = generatePassword(options);
    if (!pwd) {
      triggerAlert('Please select at least one character option.', 'error');
      setPassword('');
      return;
    }
    setPassword(pwd);
  };

  useEffect(() => {
    handleGenerate();
  }, [options.length, options.uppercase, options.lowercase, options.numbers, options.symbols, options.excludeAmbiguous, options.easyToRead, options.easyToSpeak, options.excludeChars, options.prefix, options.suffix]);

  const applyPreset = (preset: PresetName) => {
    switch (preset) {
      case 'standard':
        setOptions({
          ...initialOptions,
          length: 16,
          uppercase: true,
          lowercase: true,
          numbers: true,
          symbols: true,
          easyToSpeak: false,
        });
        break;
      case 'pin':
        setOptions({
          ...initialOptions,
          length: 6,
          uppercase: false,
          lowercase: false,
          numbers: true,
          symbols: false,
        });
        break;
      case 'memorable':
        setOptions({
          ...initialOptions,
          length: 12,
          easyToSpeak: true,
          uppercase: false,
          lowercase: true,
          numbers: false,
          symbols: false,
        });
        break;
      case 'strongest':
        setOptions({
          ...initialOptions,
          length: 32,
          uppercase: true,
          lowercase: true,
          numbers: true,
          symbols: true,
          excludeAmbiguous: false,
          easyToRead: false,
          easyToSpeak: false,
        });
        break;
    }
  };

  const handleSavePassword = (label: string) => {
    if (!password) return;
    const descParts = [];
    if (options.easyToSpeak) descParts.push('Speakable');
    else {
      if (options.uppercase) descParts.push('A-Z');
      if (options.lowercase) descParts.push('a-z');
      if (options.numbers) descParts.push('0-9');
      if (options.symbols) descParts.push('!@#$');
    }
    descParts.push('L:' + password.length);

    const newSaved: SavedPassword = {
      id: crypto.randomUUID ? crypto.randomUUID() : Math.random().toString(36).substring(2, 11),
      label: label.trim() || 'Untitled Password',
      password,
      timestamp: Date.now(),
      options: descParts.join(', ')
    };

    const nextSaved = [newSaved, ...savedPasswords];
    setSavedPasswords(nextSaved);
    savePasswordsToStorage(nextSaved);
    triggerAlert('Password saved successfully!', 'success');
  };

  const copyToClipboard = async (pwd: string) => {
    if (!pwd) return;
    try {
      await navigator.clipboard.writeText(pwd);
      triggerAlert('Password copied to clipboard!', 'success');
    } catch (e) {
      triggerAlert('Failed to copy password.', 'error');
    }
  };

  const poolSize = getPoolSize(options);
  const entropy = calculateEntropy(options.length, poolSize);
  const strength = { ...getStrengthInfo(entropy), entropy };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container maxWidth="lg" sx={{ py: 6 }}>
        <BrandingHeader />
        
        <Box sx={{ flexGrow: 1 }}>
          <Grid container spacing={4}>
            <Grid size={{ xs: 12, md: 7 }}>
              <PasswordGenerator
                options={options}
                setOptions={setOptions}
                password={password}
                generate={handleGenerate}
                onSave={() => setIsSaveDialogOpen(true)}
                copyToClipboard={copyToClipboard}
                strengthInfo={strength}
                applyPreset={applyPreset}
              />
              <StandaloneAnalyzer />
            </Grid>

            <Grid size={{ xs: 12, md: 5 }}>
              <SavedPasswords
                saved={savedPasswords}
                onDelete={(id) => {
                  const nextSaved = savedPasswords.filter(item => item.id !== id);
                  setSavedPasswords(nextSaved);
                  savePasswordsToStorage(nextSaved);
                  triggerAlert('Password removed from history.', 'info');
                }}
                onClearAll={() => {
                  if (window.confirm('Are you sure you want to delete all saved passwords? This action cannot be undone.')) {
                    setSavedPasswords([]);
                    savePasswordsToStorage([]);
                    triggerAlert('All passwords cleared successfully.', 'warning');
                  }
                }}
                copyToClipboard={copyToClipboard}
              />
            </Grid>
          </Grid>
        </Box>

        <EducationalHub />
        
        <SaveLabelDialog
          open={isSaveDialogOpen}
          onClose={() => setIsSaveDialogOpen(false)}
          onSave={handleSavePassword}
        />

        <Footer />

        <Snackbar
          open={alertInfo.open}
          autoHideDuration={4000}
          onClose={() => setAlertInfo({ ...alertInfo, open: false })}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        >
          <Alert severity={alertInfo.severity} sx={{ width: '100%' }}>
            {alertInfo.message}
          </Alert>
        </Snackbar>
      </Container>
    </ThemeProvider>
  );
}

// Presets checks wired.