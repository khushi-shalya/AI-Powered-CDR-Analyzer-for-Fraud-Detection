// src/components/PhoneInput.js
import React from 'react';
import { Box, TextField, Button } from '@mui/material';

const PhoneInput = ({ phone, setPhone, handleSearch }) => {
  return (
    <Box sx={{ display: 'flex', gap: 2, mb: 4 }}>
      <TextField
        fullWidth
        variant="outlined"
        label="Enter Phone Number"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        sx={{ input: { color: 'white' } }}
      />
      <Button variant="contained" color="primary" onClick={handleSearch}>
        Search
      </Button>
    </Box>
  );
};

export default PhoneInput;
