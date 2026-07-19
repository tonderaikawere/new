import React, { useState } from 'react';
import { Card, CardContent, Typography, TextField, Box, LinearProgress, Grid2 as Grid, Paper } from '@mui/material';

function getPasswordComplexityPool(password: string): number {
  let pool = 0;
  if (/[a-z]/.test(password)) pool += 26;
  if (/[A-Z]/.test(password)) pool += 26;
  if (/[0-9]/.test(password)) pool += 10;
  if (/[^a-zA-Z0-9]/.test(password)) pool += 32;
  return pool;
}

function getCrackTime(entropy: number) {
  if (entropy === 0) return 'Immediate';
  const onlineGuessesPerSec = 100;
  const offlineGuessesPerSec = 1e10;

  const secondsToCrackOnline = Math.pow(2, entropy) / onlineGuessesPerSec;
  const secondsToCrackOffline = Math.pow(2, entropy) / offlineGuessesPerSec;

  const formatTime = (seconds: number) => {
    if (seconds < 1) return 'Instantly';
    if (seconds < 60) return Math.round(seconds) + ' seconds';
    const minutes = seconds / 60;
    if (minutes < 60) return Math.round(minutes) + ' minutes';
    const hours = minutes / 60;
    if (hours < 24) return Math.round(hours) + ' hours';
    const days = hours / 24;
    if (days < 365) return Math.round(days) + ' days';
    const years = days / 365;
    if (years < 1000) return Math.round(years) + ' years';
    if (years < 1e6) return Math.round(years / 1000) + 'k years';
    if (years < 1e9) return Math.round(years / 1e6) + ' million years';
    return 'Centuries (Unbreakable)';
  };

  return {
    online: formatTime(secondsToCrackOnline),
    offline: formatTime(secondsToCrackOffline)
  };
}

export default function StandaloneAnalyzer() {
  const [inputPwd, setInputPwd] = useState('');

  const pool = getPasswordComplexityPool(inputPwd);
  const entropy = inputPwd ? inputPwd.length * Math.log2(pool) : 0;
  
  let label = 'Enter password...';
  let color = '#94a3b8';
  let progress = 0;

  if (inputPwd) {
    if (entropy < 28) {
      label = 'Very Weak (Extremely Vulnerable)';
      color = '#f44336';
      progress = 25;
    } else if (entropy < 45) {
      label = 'Weak (Easily Cracked)';
      color = '#ff9800';
      progress = 50;
    } else if (entropy < 70) {
      label = 'Medium (Relatively Safe)';
      color = '#00e5ff';
      progress = 75;
    } else {
      label = 'Excellent (Strong & Safe)';
      color = '#00e676';
      progress = 100;
    }
  }

  const times = getCrackTime(entropy);

  return (
    <Card sx={{ bgcolor: 'background.paper', p: { xs: 1, sm: 3 }, mt: 4 }}>
      <CardContent>
        <Typography variant="h5" sx={{ fontFamily: 'Outfit', fontWeight: 700, mb: 1 }}>
          Password Auditor
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
          Type a password to audit its mathematical strength and estimated crack duration.
        </Typography>

        <TextField
          fullWidth
          label="Enter password to audit"
          variant="outlined"
          value={inputPwd}
          onChange={(e) => setInputPwd(e.target.value)}
          sx={{ mb: 3 }}
        />

        {inputPwd && (
          <Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
              <Typography variant="body2" color="text.secondary">
                Entropy: <strong>{entropy.toFixed(1)} bits</strong> (Pool size: {pool})
              </Typography>
              <Typography variant="body2" sx={{ fontWeight: 600, color }}>
                {label}
              </Typography>
            </Box>
            
            <LinearProgress
              variant="determinate"
              value={progress}
              sx={{
                height: 6,
                borderRadius: 3,
                mb: 3,
                bgcolor: 'rgba(255,255,255,0.05)',
                '& .MuiLinearProgress-bar': {
                  bgcolor: color,
                  borderRadius: 3
                }
              }}
            />

            <Grid container spacing={2}>
              <Grid size={{ xs: 12, sm: 6 }}>
                <Paper sx={{ p: 2, bgcolor: 'rgba(255,255,255,0.02)' }}>
                  <Typography variant="caption" color="text.secondary" display="block">
                    Online Guessing Attack (100 guesses/sec)
                  </Typography>
                  <Typography variant="body1" sx={{ fontWeight: 'bold', color: color }}>
                    {times.online}
                  </Typography>
                </Paper>
              </Grid>
              <Grid size={{ xs: 12, sm: 6 }}>
                <Paper sx={{ p: 2, bgcolor: 'rgba(255,255,255,0.02)' }}>
                  <Typography variant="caption" color="text.secondary" display="block">
                    Offline Brute-Force (GPU Farm)
                  </Typography>
                  <Typography variant="body1" sx={{ fontWeight: 'bold', color: color }}>
                    {times.offline}
                  </Typography>
                </Paper>
              </Grid>
            </Grid>
          </Box>
        )}
      </CardContent>
    </Card>
  );
}
