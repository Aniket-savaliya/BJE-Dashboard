import React from 'react';
import { Box, Paper, Typography, InputBase } from '@mui/material';
import Layout from '../components/layout/Layout';
import StorefrontIcon from '@mui/icons-material/Storefront';
import Inventory2Icon from '@mui/icons-material/Inventory2';

const ProductManagement: React.FC = () => {
  return (
    <Layout>
      <Box sx={{ p: 4 }}>
        <Paper
          elevation={0}
          sx={{
            p: 3,
            border: '1px solid #e0e0e0',
            borderRadius: '16px',
            background: '#fff',
            maxWidth: 1400,
            mx: 'auto',
          }}
        >
          <Typography variant="h6" sx={{ fontWeight: 700, color: '#222', mb: 3 }}>
            Product Management
          </Typography>

          {/* Side by side sections */}
          <Box sx={{ display: 'flex', gap: 3, flexWrap: 'wrap' }}>
            {/* Section 1: Select Products to Update */}
            <Paper
              elevation={0}
              sx={{
                flex: 1,
                minWidth: 340,
                maxWidth: 600,
                p: 3,
                border: '1px solid #e0e0e0',
                borderRadius: '12px',
                background: '#fff',
                mb: 2,
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                <Typography variant="h6" sx={{ fontWeight: 700, display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Inventory2Icon sx={{ color: '#222', fontSize: 28 }} /> Select Products to Update
                </Typography>
              </Box>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 2, ml: '2px' }}>
                Select which of your products should be updated
              </Typography>
              <InputBase
                value="Select Products"
                readOnly
                sx={{
                  width: '100%',
                  border: '1px solid #e0e0e0',
                  borderRadius: '8px',
                  px: 1.5,
                  py: 0.6,
                  fontWeight: 500,
                  color: '#222',
                  background: '#fafbfc',
                  fontSize: '0.98rem',
                  mb: 1,
                  minHeight: 36,
                }}
              />
            </Paper>

            {/* Section 2: Update Products Across Stores */}
            <Paper
              elevation={0}
              sx={{
                flex: 1,
                minWidth: 340,
                maxWidth: 700,
                p: 3,
                border: '1px solid #e0e0e0',
                borderRadius: '12px',
                background: '#fff',
                mb: 2,
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                <Typography variant="h6" sx={{ fontWeight: 700, display: 'flex', alignItems: 'center', gap: 1 }}>
                  <StorefrontIcon sx={{ color: '#222', fontSize: 28 }} /> Update Products Across Stores
                </Typography>
              </Box>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 2, ml: '2px' }}>
                Select which of your stores should receive these product updates
              </Typography>
              <InputBase
                value="Select Products"
                readOnly
                sx={{
                  width: '100%',
                  border: '1px solid #e0e0e0',
                  borderRadius: '8px',
                  px: 1.5,
                  py: 0.6,
                  fontWeight: 500,
                  color: '#222',
                  background: '#fafbfc',
                  fontSize: '0.98rem',
                  mb: 1,
                  minHeight: 36,
                }}
              />
            </Paper>
          </Box>
        </Paper>
      </Box>
    </Layout>
  );
};

export default ProductManagement; 