import { useState, Fragment } from 'react';
import { Card, CardContent, Typography, Box, OutlinedInput, InputAdornment, Button, Grid2 as Grid, List, ListItem, ListItemText, ListItemSecondaryAction, IconButton, Paper, Divider } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import DeleteSweepIcon from '@mui/icons-material/DeleteSweep';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import DeleteIcon from '@mui/icons-material/Delete';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import DownloadIcon from '@mui/icons-material/Download';
import type { SavedPassword } from '../types';
import { exportToTxt, exportToCsv, exportToJson } from '../utils/exporter';

interface Props {
  saved: SavedPassword[];
  onDelete: (id: string) => void;
  onClearAll: () => void;
  copyToClipboard: (pwd: string) => void;
}

export default function SavedPasswords({ saved, onDelete, onClearAll, copyToClipboard }: Props) {
  const [search, setSearch] = useState('');
  const [visibleIds, setVisibleIds] = useState<Record<string, boolean>>({});

  const toggleVisibility = (id: string) => {
    setVisibleIds(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const filtered = saved.filter(item =>
    item.label.toLowerCase().includes(search.trim().toLowerCase()) ||
    item.password.toLowerCase().includes(search.trim().toLowerCase()) ||
    item.options.toLowerCase().includes(search.trim().toLowerCase())
  );

  return (
    <Card sx={{ bgcolor: 'background.paper', p: { xs: 1, sm: 3 }, height: '100%', display: 'flex', flexDirection: 'column' }}>
      <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', p: { xs: 1, sm: 2 } }}>
        <Typography variant="h5" sx={{ fontFamily: 'Outfit', fontWeight: 700, mb: 3 }}>
          Saved Passwords Drawer
        </Typography>

        <Box sx={{ display: 'flex', gap: 1, mb: 3, flexWrap: 'wrap' }}>
          <Button startIcon={<DownloadIcon />} variant="outlined" size="small" onClick={() => exportToTxt(saved)} disabled={saved.length === 0}>
            TXT
          </Button>
          <Button startIcon={<DownloadIcon />} variant="outlined" size="small" onClick={() => exportToCsv(saved)} disabled={saved.length === 0}>
            CSV
          </Button>
          <Button startIcon={<DownloadIcon />} variant="outlined" size="small" onClick={() => exportToJson(saved)} disabled={saved.length === 0}>
            JSON
          </Button>
        </Box>

        <Grid container spacing={2} sx={{ mb: 3 }} alignItems="center">
          <Grid size={{ xs: 12, sm: 7 }}>
            <OutlinedInput
              fullWidth
              size="small"
              placeholder="Search saved passwords..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              startAdornment={
                <InputAdornment position="start">
                  <SearchIcon color="disabled" />
                </InputAdornment>
              }
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 5 }}>
            <Button
              fullWidth
              color="error"
              variant="outlined"
              size="small"
              startIcon={<DeleteSweepIcon />}
              onClick={onClearAll}
              disabled={saved.length === 0}
            >
              Clear All
            </Button>
          </Grid>
        </Grid>

        <Box sx={{ flexGrow: 1, overflowY: 'auto', maxHeight: '420px', pr: 0.5 }}>
          {filtered.length === 0 ? (
            <Paper sx={{ p: 4, textAlign: 'center', bgcolor: 'rgba(255,255,255,0.01)', borderStyle: 'dashed' }}>
              <Typography variant="body2" color="text.secondary">
                {saved.length === 0 ? 'No saved passwords yet. Generate one and save it!' : 'No match found for search query.'}
              </Typography>
            </Paper>
          ) : (
            <List sx={{ p: 0 }}>
              {filtered.map((item, idx) => (
                <Fragment key={item.id}>
                  {idx > 0 && <Divider sx={{ borderColor: 'rgba(255, 255, 255, 0.05)' }} />}
                  <ListItem sx={{ py: 1.5, px: 1 }}>
                    <ListItemText
                      primary={item.label}
                      secondary={
                        <Box component="span">
                          <Typography
                            component="span"
                            variant="body2"
                            sx={{
                              fontFamily: 'monospace',
                              fontWeight: 'bold',
                              display: 'block',
                              my: 0.5,
                              color: 'secondary.light',
                              wordBreak: 'break-all'
                            }}
                          >
                            {visibleIds[item.id] ? item.password : '••••••••••••••••'}
                          </Typography>
                          <Typography component="span" variant="caption" color="text.disabled" display="block">
                            {item.options} • {new Date(item.timestamp).toLocaleDateString()}
                          </Typography>
                        </Box>
                      }
                    />
                    <ListItemSecondaryAction>
                      <IconButton onClick={() => toggleVisibility(item.id)} color="inherit" size="small" sx={{ mr: 0.5 }}>
                        {visibleIds[item.id] ? <VisibilityOffIcon fontSize="small" /> : <VisibilityIcon fontSize="small" />}
                      </IconButton>
                      <IconButton onClick={() => copyToClipboard(item.password)} color="secondary" size="small" sx={{ mr: 0.5 }}>
                        <ContentCopyIcon fontSize="small" />
                      </IconButton>
                      <IconButton onClick={() => onDelete(item.id)} color="error" size="small">
                        <DeleteIcon fontSize="small" />
                      </IconButton>
                    </ListItemSecondaryAction>
                  </ListItem>
                </Fragment>
              ))}
            </List>
          )}
        </Box>
      </CardContent>
    </Card>
  );
}
