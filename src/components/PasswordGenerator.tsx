import React from 'react';
import { Card, CardContent, Typography, Box, OutlinedInput, InputAdornment, IconButton, LinearProgress, Slider, Grid2 as Grid, FormControlLabel, Switch } from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import RefreshIcon from '@mui/icons-material/Refresh';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import { GenOptions } from '../types';

interface Props {
  options: GenOptions;
  setOptions: React.Dispatch<React.SetStateAction<GenOptions>>;
  password: string;
  generate: () => void;
  onSave: () => void;
  copyToClipboard: (pwd: string) => void;
  strengthInfo: { label: string; color: string; value: number; entropy: number };
}

export default function PasswordGenerator({ options, setOptions, password, generate, onSave, copyToClipboard, strengthInfo }: Props) {
  const handleLengthChange = (event: Event, newValue: number | number[]) => {
    setOptions(prev => ({ ...prev, length: newValue as number }));
  };

  const handleToggleChange = (field: keyof GenOptions) => (event: React.ChangeEvent<HTMLInputElement>) => {
    setOptions(prev => ({ ...prev, [field]: event.target.checked }));
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

      </CardContent>
    </Card>
  );
}
