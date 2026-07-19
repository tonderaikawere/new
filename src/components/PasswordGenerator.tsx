import React from 'react';
import { Card, CardContent, Typography, Box } from '@mui/material';
import { GenOptions } from '../types';

interface Props {
  options: GenOptions;
  setOptions: React.Dispatch<React.SetStateAction<GenOptions>>;
  password: string;
  generate: () => void;
  onSave: () => void;
}

export default function PasswordGenerator({ options, setOptions, password, generate, onSave }: Props) {
  return (
    <Card sx={{ bgcolor: 'background.paper', p: { xs: 1, sm: 3 } }}>
      <CardContent>
        <Typography variant="h5" sx={{ fontFamily: 'Outfit', fontWeight: 700, mb: 3 }}>
          Generate Secure Password
        </Typography>
        <Box sx={{ color: 'text.secondary' }}>Generator interface rendering soon.</Box>
      </CardContent>
    </Card>
  );
}
