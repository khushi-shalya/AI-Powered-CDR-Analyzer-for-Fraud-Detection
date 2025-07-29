import React from 'react';
import { Box, Typography, Card, CardContent } from '@mui/material';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

const COLORS = ['#00f589', '#0df2ff', '#ff6347', '#ffd700'];

const InfographicsPanel = ({ data }) => {
  if (!data.length) return null;

  const callTypeCount = {};
  const locationCount = {};
  let totalDuration = 0;
  let roamingYes = 0;

  data.forEach(record => {
    totalDuration += record.Duration;
    if (record.Roaming === 'Yes') roamingYes++;
    callTypeCount[record.CallType] = (callTypeCount[record.CallType] || 0) + 1;
    locationCount[record.Location] = (locationCount[record.Location] || 0) + 1;
  });

  const callTypeData = Object.entries(callTypeCount).map(([name, value]) => ({ name, value }));
  const locationData = Object.entries(locationCount).map(([name, value]) => ({ name, value }));

  return (
    <Box
      sx={{
        display: 'grid',
        gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' },
        gap: 2,
        height: '100%',
      }}
    >
      <Card sx={{ backgroundColor: '#101522', color: 'white', minHeight: 200, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        <CardContent>
          <Typography variant="h6" color="primary">Total Call Duration</Typography>
          <Typography variant="h3">{totalDuration} seconds</Typography>
        </CardContent>
      </Card>

      <Card sx={{ backgroundColor: '#101522', color: 'white', minHeight: 250 }}>
        <CardContent>
          <Typography variant="h6" color="primary">Call Type Distribution</Typography>
          <Box sx={{ height: 200 }}>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={callTypeData} dataKey="value" nameKey="name" outerRadius={70} label>
                  {callTypeData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </Box>
        </CardContent>
      </Card>

      <Card sx={{ backgroundColor: '#101522', color: 'white', minHeight: 250 }}>
        <CardContent>
          <Typography variant="h6" color="primary">Location Distribution</Typography>
          <Box sx={{ height: 200 }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={locationData}>
                <XAxis dataKey="name" stroke="#ccc" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="value" fill="#00f589" />
              </BarChart>
            </ResponsiveContainer>
          </Box>
        </CardContent>
      </Card>

      <Card sx={{ backgroundColor: '#101522', color: 'white', minHeight: 200, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        <CardContent>
          <Typography variant="h6" color="primary">Roaming Usage</Typography>
          <Typography variant="h5">{roamingYes} / {data.length} calls in roaming</Typography>
        </CardContent>
      </Card>
    </Box>
  );
};

export default InfographicsPanel;
