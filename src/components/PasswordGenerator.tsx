import React from 'react';
import { Card, CardContent, Typography, Box, OutlinedInput, InputAdornment, IconButton, LinearProgress } from '@mui/material';
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
      </CardContent>
    </Card>
  );
}
