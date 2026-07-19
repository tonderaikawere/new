import React from 'react';
import { Box, Grid2 as Grid, Typography, Card, CardContent } from '@mui/material';

export default function EducationalHub() {
  return (
    <Box sx={{ mt: 8 }}>
      <Typography variant="h5" sx={{ fontFamily: 'Outfit', mb: 3, textAlign: 'center', fontWeight: 700, color: 'primary.light' }}>
        Learn Password Security
      </Typography>
      <Grid container spacing={3}>
        <Grid size={{ xs: 12, md: 6 }}>
          <Card sx={{ height: '100%' }}>
            <CardContent>
              <Typography variant="h6">Coming Soon</Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}
