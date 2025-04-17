import React, { useState } from 'react';
import {
  AppBar,
  Toolbar,
  IconButton,
  Box,
  Avatar,
  Menu,
  MenuItem,
  ListItemIcon,
  Divider,
  useTheme,
} from '@mui/material';
import {
  Menu as MenuIcon,
  Person as PersonIcon,
  Settings as SettingsIcon,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

interface HeaderProps {
  drawerWidth: number;
  handleSidebarToggle: () => void;
}

const Header: React.FC<HeaderProps> = ({ drawerWidth, handleSidebarToggle }) => {
  const theme = useTheme();
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleProfileClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar 
      position="fixed" 
      sx={{ 
        width: { sm: `calc(100% - ${drawerWidth}px)` },
        ml: { sm: `${drawerWidth}px` },
        zIndex: theme.zIndex.drawer + 1,
        backdropFilter: 'blur(10px)',
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
        boxShadow: 'none',
        borderBottom: '1px solid rgba(0, 0, 0, 0.1)'
      }}
    >
      <Toolbar>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          edge="start"
          onClick={handleSidebarToggle}
          sx={{ mr: 2, display: { sm: 'none' } }}
        >
          <MenuIcon />
        </IconButton>
        <Box sx={{ flexGrow: 1 }} />
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <IconButton
            onClick={handleProfileClick}
            size="small"
            sx={{ ml: 2 }}
            aria-controls={Boolean(anchorEl) ? 'account-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={Boolean(anchorEl) ? 'true' : undefined}
          >
            <Avatar sx={{ width: 32, height: 32, bgcolor: 'primary.main' }}>
              <PersonIcon />
            </Avatar>
          </IconButton>
          <Menu
            anchorEl={anchorEl}
            id="account-menu"
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
            onClick={handleMenuClose}
            transformOrigin={{ horizontal: 'right', vertical: 'top' }}
            anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
          >
            <MenuItem>
              <ListItemIcon>
                <PersonIcon fontSize="small" />
              </ListItemIcon>
              Profile
            </MenuItem>
            <MenuItem onClick={() => navigate('/settings')}>
              <ListItemIcon>
                <SettingsIcon fontSize="small" />
              </ListItemIcon>
              Settings
            </MenuItem>
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;