import React from 'react';
import { Box, Grid2 as Grid, Typography, Card, CardContent } from '@mui/material';
import CalculateIcon from '@mui/icons-material/Calculate';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import StorageIcon from '@mui/icons-material/Storage';

export default function EducationalHub() {
  return (
    <Box sx={{ mt: 8 }}>
      <Typography variant="h5" sx={{ fontFamily: 'Outfit', mb: 4, textAlign: 'center', fontWeight: 700, color: 'primary.light' }}>
        Learn Password Security
      </Typography>
      <Grid container spacing={3}>
        <Grid size={{ xs: 12, md: 6 }}>
          <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 1.5 }}>
                <CalculateIcon color="primary" sx={{ mr: 1 }} />
                <Typography variant="h6" sx={{ fontFamily: 'Outfit', fontWeight: 600 }}>
                  What is Password Entropy?
                </Typography>
              </Box>
              <Typography variant="body2" color="text.secondary" paragraph>
                Password entropy is a mathematical measure of how unpredictable a password is. It is measured in <strong>bits</strong>. The formula is:
                <br />
                <code style={{ background: 'rgba(255,255,255,0.05)', padding: '2px 6px', borderRadius: 4, display: 'inline-block', margin: '6px 0' }}>
                  Entropy = Length × log₂(Pool Size)
                </code>
              </Typography>
              <Typography variant="body2" color="text.secondary">
                The higher the entropy, the more combinations an attacker has to guess. To secure yourself against brute-force attacks, aim for at least <strong>60 bits</strong> for regular accounts, and <strong>80+ bits</strong> for critical logins. Increasing length is far more effective than adding complex symbols!
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>
          <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 1.5 }}>
                <WarningAmberIcon color="warning" sx={{ mr: 1 }} />
                <Typography variant="h6" sx={{ fontFamily: 'Outfit', fontWeight: 600 }}>
                  Common Password Mistakes
                </Typography>
              </Box>
              <Typography variant="body2" color="text.secondary" paragraph>
                Many credentials fail not because they lack complexity, but because they are predictable. Avoid:
              </Typography>
              <ul style={{ paddingLeft: 20, margin: 0, fontSize: '0.875rem', color: '#94a3b8' }}>
                <li><strong>Reusing Passwords:</strong> If one site gets breached, attackers try that password on all your accounts.</li>
                <li><strong>Dictionary Words & Names:</strong> Hackers use dictionary lists (wordlists) to guess millions of combinations instantly.</li>
                <li><strong>Common Subsitutions:</strong> Changing "Password" to "P@$$w0rd" is heavily anticipated by modern cracking programs.</li>
                <li><strong>Personal Info:</strong> Birthdays, pet names, and phone numbers are easily scrapeable on social media.</li>
              </ul>
            </CardContent>
          </Card>
        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>
          <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 1.5 }}>
                <StorageIcon color="secondary" sx={{ mr: 1 }} />
                <Typography variant="h6" sx={{ fontFamily: 'Outfit', fontWeight: 600 }}>
                  Why Use a Password Manager?
                </Typography>
              </Box>
              <Typography variant="body2" color="text.secondary" paragraph>
                Since humans cannot remember dozens of 16-character random passwords, using a password manager is essential.
              </Typography>
              <Typography variant="body2" color="text.secondary">
                A password manager securely stores all your unique, complex credentials in an encrypted vault. You only need to remember one <strong>master passphrase</strong> to unlock your vault. This protects you against credential stuffing, phishing, and typing mistakes. Excellent, reputable options include Bitwarden, 1Password, or KeePass (offline).
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}
