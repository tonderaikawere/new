import React, { useState } from 'react';
import { Card, CardContent, Typography, TextField, Box, LinearProgress, Grid2 as Grid } from '@mui/material';

export default function StandaloneAnalyzer() {
  const [inputPwd, setInputPwd] = useState('');

  return (
    <Card sx={{ bgcolor: 'background.paper', p: { xs: 1, sm: 3 }, mt: 4 }}>
      <CardContent>
        <Typography variant="h5" sx={{ fontFamily: 'Outfit', fontWeight: 700, mb: 2 }}>
          Test Your Password Strength
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
          Type or paste any password below to calculate its mathematical entropy and estimated crack time under standard dictionary/brute-force setups.
        </Typography>

        <TextField
          fullWidth
          label="Enter custom password to test"
          variant="outlined"
          value={inputPwd}
          onChange={(e) => setInputPwd(e.target.value)}
          sx={{ mb: 2 }}
        />
        
        <Box sx={{ color: 'text.secondary' }}>Real-time entropy analytics rendering soon.</Box>
      </CardContent>
    </Card>
  );
}
