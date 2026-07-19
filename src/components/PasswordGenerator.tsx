import type { Dispatch, SetStateAction, ChangeEvent } from 'react';
import { Card, CardContent, Typography, Box, OutlinedInput, InputAdornment, IconButton, LinearProgress, Slider, Grid2 as Grid, FormControlLabel, Switch, Accordion, AccordionSummary, AccordionDetails, TextField, Chip, Alert } from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import RefreshIcon from '@mui/icons-material/Refresh';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import type { GenOptions, PresetName } from '../types';

interface Props {
  options: GenOptions;
  setOptions: Dispatch<SetStateAction<GenOptions>>;
  password: string;
  generate: () => void;
  onSave: () => void;
  copyToClipboard: (pwd: string) => void;
  strengthInfo: { label: string; color: string; value: number; entropy: number };
  applyPreset: (preset: PresetName) => void;
}

export default function PasswordGenerator({ options, setOptions, password, generate, onSave, copyToClipboard, strengthInfo, applyPreset }: Props) {
  const handleLengthChange = (_event: any, newValue: number | number[]) => {
    setOptions(prev => ({ ...prev, length: newValue as number }));
  };

  const handleToggleChange = (field: keyof GenOptions) => (event: ChangeEvent<HTMLInputElement>) => {
    const isChecked = event.target.checked;
    setOptions(prev => {
      const next = { ...prev, [field]: isChecked };
      if (field === 'easyToSpeak' && isChecked) {
        next.easyToRead = false;
      }
      if (field === 'easyToRead' && isChecked) {
        next.easyToSpeak = false;
      }
      return next;
    });
  };

  const handleTextChange = (field: 'excludeChars' | 'prefix' | 'suffix') => (event: React.ChangeEvent<HTMLInputElement>) => {
    setOptions(prev => ({ ...prev, [field]: event.target.value }));
  };

  return (
    <Card sx={{ bgcolor: 'background.paper', p: { xs: 1, sm: 3 } }}>
      <CardContent>
        <Typography variant="h5" sx={{ fontFamily: 'Outfit', fontWeight: 700, mb: 3 }}>
          Generate Secure Password
        </Typography>

        <Box sx={{ mb: 4 }}>
          <OutlinedInput
            fullWidth
            value={password}
            readOnly
            placeholder="Click generate..."
            sx={{
              fontFamily: 'monospace',
              fontSize: { xs: '1rem', sm: '1.25rem' },
              fontWeight: 'bold',
              bgcolor: 'rgba(0, 0, 0, 0.2)',
              mb: 1.5,
              '& .MuiOutlinedInput-input': {
                py: 2,
                px: { xs: 1.5, sm: 2.5 }
              }
            }}
            endAdornment={
              <InputAdornment position="end">
                <IconButton onClick={generate} color="primary" title="Regenerate password">
                  <RefreshIcon />
                </IconButton>
                <IconButton onClick={() => copyToClipboard(password)} color="secondary" disabled={!password} title="Copy password">
                  <ContentCopyIcon />
                </IconButton>
                <IconButton onClick={onSave} color="success" disabled={!password} title="Save password">
                  <BookmarkBorderIcon />
                </IconButton>
              </InputAdornment>
            }
          />

          {strengthInfo.entropy === 0 && (
            <Alert severity="error" sx={{ mb: 2 }}>
              Please select at least one character set checkbox below to generate a valid password!
            </Alert>
          )}
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1 }}>
            <Typography variant="body2" color="text.secondary">
              Entropy: <strong>{strengthInfo.entropy.toFixed(1)} bits</strong>
            </Typography>
            <Typography variant="body2" sx={{ fontWeight: 600, color: strengthInfo.color }}>
              {strengthInfo.label}
            </Typography>
          </Box>
          <LinearProgress
            variant="determinate"
            value={strengthInfo.value}
            sx={{
              height: 6,
              borderRadius: 3,
              bgcolor: 'rgba(255,255,255,0.05)',
              '& .MuiLinearProgress-bar': {
                bgcolor: strengthInfo.color,
                borderRadius: 3
              }
            }}
          />
        </Box>

        <Box sx={{ mb: 4 }}>
          <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 500, mb: 1 }}>
            Quick Configuration Presets:
          </Typography>
          <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
            <Chip label="All-Purpose (Standard)" onClick={() => applyPreset('standard')} color="primary" variant="outlined" sx={{ cursor: 'pointer' }} />
            <Chip label="Secured PIN" onClick={() => applyPreset('pin')} color="secondary" variant="outlined" sx={{ cursor: 'pointer' }} />
            <Chip label="Easy to Speak (Memorable)" onClick={() => applyPreset('memorable')} color="info" variant="outlined" sx={{ cursor: 'pointer' }} />
            <Chip label="Maximum Strength" onClick={() => applyPreset('strongest')} color="warning" variant="outlined" sx={{ cursor: 'pointer' }} />
          </Box>
        </Box>

        <Box sx={{ mb: 4 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
            <Typography variant="body1" sx={{ fontWeight: 500 }}>
              Password Length
            </Typography>
            <Typography variant="body1" color="primary.light" sx={{ fontWeight: 'bold', fontFamily: 'Outfit' }}>
              {options.length} characters
            </Typography>
          </Box>
          <Grid container spacing={2} alignItems="center">
            <Grid size={12}>
              <Slider
                value={options.length}
                onChange={handleLengthChange}
                min={4}
                max={64}
                valueLabelDisplay="auto"
                sx={{
                  color: 'primary.main',
                  height: 6,
                  '& .MuiSlider-thumb': {
                    width: 18,
                    height: 18,
                    '&:hover, &.Mui-focusVisible': {
                      boxShadow: '0px 0px 0px 8px rgba(168, 85, 247, 0.16)'
                    }
                  }
                }}
              />
            </Grid>
          </Grid>
        </Box>

        <Box sx={{ mb: 4 }}>
          <Typography variant="body1" sx={{ fontWeight: 500, mb: 1.5 }}>
            Character Settings
          </Typography>
          <Grid container spacing={1}>
            <Grid size={{ xs: 6, sm: 3 }}>
              <FormControlLabel
                control={<Switch checked={options.uppercase} onChange={handleToggleChange('uppercase')} color="primary" />}
                label="A-Z"
              />
            </Grid>
            <Grid size={{ xs: 6, sm: 3 }}>
              <FormControlLabel
                control={<Switch checked={options.lowercase} onChange={handleToggleChange('lowercase')} color="primary" />}
                label="a-z"
              />
            </Grid>
            <Grid size={{ xs: 6, sm: 3 }}>
              <FormControlLabel
                control={<Switch checked={options.numbers} onChange={handleToggleChange('numbers')} color="primary" />}
                label="0-9"
              />
            </Grid>
            <Grid size={{ xs: 6, sm: 3 }}>
              <FormControlLabel
                control={<Switch checked={options.symbols} onChange={handleToggleChange('symbols')} color="primary" />}
                label="!@#$"
              />
            </Grid>
          </Grid>
        </Box>

        <Accordion sx={{ bgcolor: 'rgba(255, 255, 255, 0.02)', mb: 3, border: '1px solid rgba(255, 255, 255, 0.05)', boxShadow: 'none' }}>
          <AccordionSummary expandIcon={<ExpandMoreIcon color="primary" />}>
            <Typography variant="body2" sx={{ fontWeight: 600 }}>
              Advanced Exclusion & Filters Settings
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Grid container spacing={2}>
              <Grid size={12}>
                <FormControlLabel
                  control={<Switch checked={options.excludeAmbiguous} onChange={handleToggleChange('excludeAmbiguous')} color="secondary" />}
                  label={
                    <Box>
                      <Typography variant="body2" sx={{ fontWeight: 500 }}>Exclude Ambiguous Characters</Typography>
                      <Typography variant="caption" color="text.secondary">Avoids brackets, braces, commas, slashes: {"{ } [ ] ( ) / \\ ' \" ` ~ , ; : . < >"}</Typography>
                    </Box>
                  }
                  sx={{ width: '100%', alignItems: 'flex-start', m: 0, mb: 2 }}
                />
              </Grid>
              <Grid size={12}>
                <FormControlLabel
                  control={<Switch checked={options.easyToRead} onChange={handleToggleChange('easyToRead')} color="secondary" />}
                  label={
                    <Box>
                      <Typography variant="body2" sx={{ fontWeight: 500 }}>Easy to Read (Exclude Similar Characters)</Typography>
                      <Typography variant="caption" color="text.secondary">Avoids confusing symbols like l, 1, I, o, 0, O, 2, Z, 5, S</Typography>
                    </Box>
                  }
                  sx={{ width: '100%', alignItems: 'flex-start', m: 0, mb: 2 }}
                />
              </Grid>
              <Grid size={12}>
                <FormControlLabel
                  control={<Switch checked={options.easyToSpeak} onChange={handleToggleChange('easyToSpeak')} color="secondary" />}
                  label={
                    <Box>
                      <Typography variant="body2" sx={{ fontWeight: 500 }}>Easy to Speak (Pronounceable Syllables)</Typography>
                      <Typography variant="caption" color="text.secondary">Generates speakable phonetic syllables instead of random character streams</Typography>
                    </Box>
                  }
                  sx={{ width: '100%', alignItems: 'flex-start', m: 0, mb: 2 }}
                />
              </Grid>
              
              <Grid size={{ xs: 12, sm: 6 }}>
                <TextField
                  fullWidth
                  label="Password Prefix"
                  variant="outlined"
                  size="small"
                  placeholder="e.g. static_pre-"
                  value={options.prefix}
                  onChange={handleTextChange('prefix')}
                />
              </Grid>
              <Grid size={{ xs: 12, sm: 6 }}>
                <TextField
                  fullWidth
                  label="Password Suffix"
                  variant="outlined"
                  size="small"
                  placeholder="e.g. -static_post"
                  value={options.suffix}
                  onChange={handleTextChange('suffix')}
                />
              </Grid>
              
              <Grid size={12}>
                <TextField
                  fullWidth
                  label="Custom Characters to Exclude"
                  variant="outlined"
                  size="small"
                  placeholder="e.g. abcXYZ123"
                  value={options.excludeChars}
                  onChange={handleTextChange('excludeChars')}
                  sx={{ mt: 1 }}
                />
              </Grid>
            </Grid>
          </AccordionDetails>
        </Accordion>

      </CardContent>
    </Card>
  );
}
