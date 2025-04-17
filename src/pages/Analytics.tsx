import { Box, Typography, Paper } from '@mui/material';
// import LineChart from '../components/dashboard/LineChart';
// import BarChart from '../components/dashboard/BarChart';

export default function Analytics() {
  return (
    <Box sx={{ flexGrow: 1, p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Analytics
      </Typography>
      
      <Box sx={{ 
        display: 'grid',
        gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' },
        gap: 3
      }}>
        <Paper sx={{ p: 2, gridColumn: { xs: '1 / -1', md: '1 / -1' } }}>
          <Typography variant="h6" gutterBottom>
            Performance Overview
          </Typography>
          {/* <LineChart /> */}
        </Paper>
        
        <Paper sx={{ p: 2 }}>
          <Typography variant="h6" gutterBottom>
            Project Distribution
          </Typography>
          {/* <BarChart /> */}
        </Paper>
        
        <Paper sx={{ p: 2 }}>
          <Typography variant="h6" gutterBottom>
            User Engagement
          </Typography>
          {/* <LineChart /> */}
        </Paper>
      </Box>
    </Box>
  );
} 