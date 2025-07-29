// src/components/CDRTable.js
import React, { useState } from 'react';
import {
  Table, TableBody, TableCell, TableContainer,
  TableHead, TableRow, Paper, Typography,
  TextField, TablePagination
} from '@mui/material';

const CDRTable = ({ data }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [page, setPage] = useState(0);
  const rowsPerPage = 5;

  const filtered = data.filter((row) =>
    Object.values(row).some(val =>
      String(val).toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  return (
    <Paper sx={{ backgroundColor: '#101522', p: 2 }}>
      <Typography variant="h6" color="primary" gutterBottom>
        Call Detail Records
      </Typography>

      <TextField
        label="Search"
        variant="outlined"
        size="small"
        fullWidth
        sx={{ mb: 2, input: { color: 'white' } }}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              {['Caller', 'Receiver', 'CallType', 'StartTime', 'EndTime', 'Duration', 'Roaming', 'Status', 'Location']
                .map((head) => (
                  <TableCell key={head} sx={{ color: 'white' }}>{head}</TableCell>
                ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {filtered
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row, idx) => (
                <TableRow key={idx}>
                  {Object.values(row).map((val, i) => (
                    <TableCell key={i} sx={{ color: '#a3b1c6' }}>{val}</TableCell>
                  ))}
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>

      <TablePagination
        component="div"
        count={filtered.length}
        page={page}
        onPageChange={(e, newPage) => setPage(newPage)}
        rowsPerPage={rowsPerPage}
        rowsPerPageOptions={[5]}
      />
    </Paper>
  );
};

export default CDRTable;
