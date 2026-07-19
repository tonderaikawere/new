import { Box, Typography, Link, Chip, Grid2 as Grid } from '@mui/material';
import SecurityIcon from '@mui/icons-material/Security';
import InfoIcon from '@mui/icons-material/Info';

export default function BrandingHeader() {
  return (
    <Box sx={{ textAlign: 'center', mb: 6 }}>
      <Grid container justifyContent="center" alignItems="center" spacing={1} sx={{ mb: 1 }}>
        <Grid>
          <SecurityIcon color="primary" sx={{ fontSize: 40, verticalAlign: 'middle', mr: 1 }} />
        </Grid>
        <Grid>
          <Typography
            variant="h2"
            component="h1"
            sx={{
              fontFamily: 'Outfit',
              fontWeight: 800,
              fontSize: { xs: '2rem', sm: '2.75rem' },
              background: 'linear-gradient(90deg, #a855f7 0%, #06b6d4 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              display: 'inline-block'
            }}
          >
            KAWERIFY TECH PASSWORDS
          </Typography>
        </Grid>
      </Grid>
      
      <Typography variant="body1" color="text.secondary" sx={{ maxWidth: '600px', mx: 'auto', mb: 2 }}>
        An ultra-secure, cryptographically-strong password utility. Developed and maintained by{' '}
        <Link href="https://kawerifytech.com" target="_blank" rel="noopener" color="secondary" sx={{ fontWeight: 600, textDecoration: 'none', '&:hover': { textDecoration: 'underline' } }}>
          Kawerify Tech
        </Link>.
      </Typography>

      <Box sx={{ display: 'flex', justifyContent: 'center', gap: 1.5, flexWrap: 'wrap' }}>
        <Chip
          icon={<InfoIcon style={{ color: '#06b6d4' }} />}
          label="100% Free of Charge"
          variant="outlined"
          sx={{ borderColor: 'rgba(6, 182, 212, 0.3)', bgcolor: 'rgba(6, 182, 212, 0.05)', color: '#06b6d4', fontWeight: 500 }}
        />
        <Chip
          label="Strictly Non-Commercial Use Only"
          variant="outlined"
          color="warning"
          sx={{ borderColor: 'rgba(237, 108, 2, 0.3)', bgcolor: 'rgba(237, 108, 2, 0.05)', fontWeight: 500 }}
        />
        <Chip
          label="No Ads / No Tracking"
          variant="outlined"
          color="success"
          sx={{ borderColor: 'rgba(46, 125, 50, 0.3)', bgcolor: 'rgba(46, 125, 50, 0.05)', fontWeight: 500 }}
        />
      </Box>
    </Box>
  );
}
