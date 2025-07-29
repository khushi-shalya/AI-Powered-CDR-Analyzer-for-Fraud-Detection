// src/App.js
import React, { useState } from 'react';
import {
  Container,
  Typography,
  CircularProgress,
  Alert,
  Box,
  IconButton,
} from '@mui/material';
import { ChevronLeft, ChevronRight } from '@mui/icons-material';
import PhoneInput from './components/PhoneInput';
import CDRTable from './components/CDRTable';
import InfographicsPanel from './components/InfographicsPanel';
import { fetchCDRByPhone } from './utils/api';

function App() {
  const [phone, setPhone] = useState('');
  const [cdrData, setCdrData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showTable, setShowTable] = useState(true); // for collapsing

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
              gridTemplateColumns: showTable
                ? { xs: '1fr', md: '2fr 1fr' }
                : { xs: '1fr', md: '1fr' },
              gap: 3,
              mt: 2,
              position: 'relative',
            }}
          >
            {/* Toggle button on the left */}
            <IconButton
              onClick={() => setShowTable(!showTable)}
              sx={{
                position: 'absolute',
                top: 0,
                left: 0,
                zIndex: 10,
                bgcolor: 'primary.main',
                color: 'white',
                borderRadius: '0 5px 5px 0',
                width: '32px',
                height: '100%',
                display: { xs: 'none', md: 'flex' },
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              {showTable ? <ChevronLeft /> : <ChevronRight />}
            </IconButton>

            {showTable && (
              <Box sx={{ overflowX: 'auto', marginLeft: { xs: 0, md: '32px' } }}>
                <CDRTable data={cdrData} />
              </Box>
            )}

            <InfographicsPanel data={cdrData} />
          </Box>
        )}
      </Container>
    </Box>
  );
}

export default App;
