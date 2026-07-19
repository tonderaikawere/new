import { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogContentText, TextField, DialogActions, Button } from '@mui/material';

interface Props {
  open: boolean;
  onClose: () => void;
  onSave: (label: string) => void;
}

export default function SaveLabelDialog({ open, onClose, onSave }: Props) {
  const [label, setLabel] = useState('');

  const handleConfirm = () => {
    onSave(label || 'Untitled Password');
    setLabel('');
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="xs">
      <DialogTitle sx={{ fontFamily: 'Outfit', fontWeight: 700 }}>Label Saved Password</DialogTitle>
      <DialogContent>
        <DialogContentText sx={{ mb: 2 }}>
          Give your saved password a label (e.g. "Personal Gmail" or "Work Wi-Fi") to identify it later.
        </DialogContentText>
        <TextField
          autoFocus
          margin="dense"
          label="Label / Description"
          type="text"
          fullWidth
          variant="outlined"
          value={label}
          onChange={(e) => setLabel(e.target.value)}
          placeholder="e.g. Gmail Account"
        />
      </DialogContent>
      <DialogActions sx={{ px: 3, pb: 2.5 }}>
        <Button onClick={onClose} color="inherit">Cancel</Button>
        <Button onClick={handleConfirm} variant="contained" color="primary">Save Password</Button>
      </DialogActions>
    </Dialog>
  );
}
