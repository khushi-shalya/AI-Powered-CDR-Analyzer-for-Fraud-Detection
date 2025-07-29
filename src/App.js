// src/App.js
import React, { useState } from 'react';
import { Container, Typography, CircularProgress, Alert, Box } from '@mui/material';
import PhoneInput from './components/PhoneInput';
import CDRTable from './components/CDRTable';
import InfographicsPanel from './components/InfographicsPanel';
import { fetchCDRByPhone } from './utils/api';

function App() {
  const [phone, setPhone] = useState('');
  const [cdrData, setCdrData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSearch = async () => {
    setLoading(true);
    setError('');
    setCdrData([]);

    try {
      const data = await fetchCDRByPhone(phone);
      setCdrData(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ height: '100vh', overflow: 'auto', bgcolor: 'background.default' }}>
      <Container maxWidth="xl" sx={{ py: 2 }}>
        <Typography variant="h4" color="primary" gutterBottom>
          CDR Dashboard
        </Typography>

        <PhoneInput phone={phone} setPhone={setPhone} handleSearch={handleSearch} />

        {loading && <CircularProgress color="secondary" sx={{ mt: 4 }} />}
        {error && <Alert severity="error" sx={{ mt: 4 }}>{error}</Alert>}

        {!loading && !error && cdrData.length > 0 && (
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: { xs: '1fr', md: '2fr 1fr' },
              gap: 3,
              mt: 2,
            }}
          >
            <Box sx={{ overflowX: 'auto' }}>
              <CDRTable data={cdrData} />
            </Box>

            <InfographicsPanel data={cdrData} />
          </Box>
        )}
      </Container>
    </Box>
  );
}

export default App;
