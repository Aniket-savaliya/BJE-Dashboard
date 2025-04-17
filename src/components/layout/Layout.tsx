import React, { useState } from 'react';
import { Box } from '@mui/material';
import Sidebar from './Sidebar';
import Header from './Header';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const drawerWidth = 240;

  const handleSidebarToggle = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <Sidebar drawerWidth={drawerWidth} isOpen={isSidebarOpen} />
      <Header drawerWidth={drawerWidth} handleSidebarToggle={handleSidebarToggle} />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          mt: 8,
          width: `calc(100% - ${isSidebarOpen ? drawerWidth : 0}px)`,
          transition: (theme) =>
            theme.transitions.create(['width', 'margin'], {
              easing: theme.transitions.easing.sharp,
              duration: theme.transitions.duration.leavingScreen,
            }),
        }}
      >
        {children}
      </Box>
    </Box>
  );
};

export default Layout; 