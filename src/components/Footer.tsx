import React from 'react';
import { Box, Typography, Link, Divider } from '@mui/material';

export default function Footer() {
  return (
    <Box sx={{ mt: 10, pb: 4, textAlign: 'center' }}>
      <Divider sx={{ mb: 4, borderColor: 'rgba(255, 255, 255, 0.08)' }} />
      <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
        © {new Date().getFullYear()} Developed by{' '}
        <Link href="https://kawerifytech.com" target="_blank" rel="noopener" color="primary" sx={{ fontWeight: 600, textDecoration: 'none' }}>
          Kawerify Tech
        </Link>. Managed by Kawerify Tech as a public utility tool to be used by anyone free of charge.
      </Typography>
      <Typography variant="caption" color="text.disabled" display="block" sx={{ maxWidth: 650, mx: 'auto', lineHeight: 1.5 }}>
        Disclaimer: This tool generates passwords client-side in your browser. Saved passwords are stored locally in your own browser's cache (LocalStorage) and are never transmitted to any server. Kawerify Tech does not have access to your saved passwords. Please ensure you keep a backup copy.
      </Typography>
    </Box>
  );
}
