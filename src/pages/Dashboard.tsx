import React from 'react';
import { Box, Grid as MuiGrid, Paper, Typography } from '@mui/material';
import Layout from '../components/layout/Layout';

const Grid = MuiGrid as any;

const Dashboard: React.FC = () => {
  return (
    <Layout>
      <Box sx={{ flexGrow: 1, p: 3 }}>
        <Typography variant="h4" gutterBottom>
          Dashboard
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={3}>
            <Paper variant="dashboardCard">
              <Box sx={{ p: 3, display: 'flex', flexDirection: 'column', height: 160 }}>
                <Typography component="h2" variant="h6" gutterBottom>
                  Total Orders
                </Typography>
                <Typography component="p" variant="h4">
                  24
                </Typography>
              </Box>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Paper variant="dashboardCard" color="success">
              <Box sx={{ p: 3, display: 'flex', flexDirection: 'column', height: 160 }}>
                <Typography component="h2" variant="h6" gutterBottom>
                  Total Products
                </Typography>
                <Typography component="p" variant="h4">
                  150
                </Typography>
              </Box>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Paper variant="dashboardCard" color="warning">
              <Box sx={{ p: 3, display: 'flex', flexDirection: 'column', height: 160 }}>
                <Typography component="h2" variant="h6" gutterBottom>
                  Total Sales
                </Typography>
                <Typography component="p" variant="h4">
                  $12,345
                </Typography>
              </Box>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Paper variant="dashboardCard" color="secondary">
              <Box sx={{ p: 3, display: 'flex', flexDirection: 'column', height: 160 }}>
                <Typography component="h2" variant="h6" gutterBottom>
                  Active Users
                </Typography>
                <Typography component="p" variant="h4">
                  5
                </Typography>
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </Layout>
  );
};

export default Dashboard; 