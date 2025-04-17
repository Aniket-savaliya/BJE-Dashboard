import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { theme } from './styles/theme';
import Orders from './pages/Orders'; 
import Products from './pages/Products'; 
import Sales from './pages/Sales'; 
import Settings from './pages/Settings';
import Sidebar from './components/layout/Sidebar';
import Header from './components/layout/Header';
import { Box } from '@mui/material';

const drawerWidth = 240;

function App() {
  const [isSidebarOpen, setSidebarOpen] = useState(true);

  const handleSidebarToggle = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
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
              transition: theme.transitions.create(['width', 'margin'], {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.leavingScreen,
              }),
            }}
          >
            <Routes>
              <Route path="/" element={<Navigate to="/orders" replace />} />
              <Route path="/orders" element={<Orders />} />
              <Route path="/products" element={<Products />} />
              <Route path="/sales" element={<Sales />} />
              <Route path="/settings" element={<Settings />} />
            </Routes>
          </Box>
        </Box>
      </Router>
    </ThemeProvider>
  );
}

export default App;
