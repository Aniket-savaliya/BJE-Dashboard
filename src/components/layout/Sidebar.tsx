import { Link, useLocation } from 'react-router-dom';
import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListItemButton,
  Divider,
  Box,
  Typography,
  useTheme,
  Avatar,
  IconButton,
  Menu,
  MenuItem
} from '@mui/material';
import {
  Dashboard as DashboardDaIcon,
  ShoppingBag as ProductsIcon,
  ReceiptLong as OrdersIcon,
  PointOfSale as SalesIcon,
  Settings as SettingsIcon,
  Edit as EditIcon
} from '@mui/icons-material';
import { useState } from 'react';

// Define props interface
interface SidebarProps {
  drawerWidth: number;
  isOpen: boolean;
}

// Updated menu items - Added Settings
const menuItems = [
  // { text: 'Dashboard', icon: <DashboardIcon />, path: '/' }, // Removed Dashboard
  { text: 'Products', icon: <ProductsIcon />, path: '/products' },
  { text: 'Orders', icon: <OrdersIcon />, path: '/' }, // Changed Orders path to root
  { text: 'Sales', icon: <SalesIcon />, path: '/sales' },
  { text: 'Settings', icon: <SettingsIcon />, path: '/settings' },
];

// Define transition styles
const openedMixin = (theme: any, drawerWidth: number) => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme: any) => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

export default function Sidebar({ isOpen, drawerWidth }: SidebarProps) {
  const location = useLocation();
  const theme = useTheme();
  const [profileImage] = useState('/assets/images/bje-logo.png');
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const isMenuOpen = Boolean(anchorEl);

  const handleProfileClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <Drawer
      variant="permanent"
      open={isOpen}
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        whiteSpace: 'nowrap',
        boxSizing: 'border-box',
        ...(isOpen && {
          ...openedMixin(theme, drawerWidth),
          '& .MuiDrawer-paper': openedMixin(theme, drawerWidth),
        }),
        ...(!isOpen && {
          ...closedMixin(theme),
          '& .MuiDrawer-paper': closedMixin(theme),
        }),
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', px: [1], height: '64px' }}>
         {isOpen && <Typography variant="h6">BJE</Typography>}
      </Box>
      <Divider />

      <List sx={{ overflow: 'auto', mt: 1 }}>
        {menuItems.map((item) => (
          <ListItem key={item.text} disablePadding sx={{ display: 'block' }}>
            <ListItemButton
              component={Link}
              to={item.path}
              // Updated selection logic for root path
              selected={item.path === '/' ? location.pathname === '/' || location.pathname === '/orders' : location.pathname === item.path}
              sx={{
                minHeight: 48,
                justifyContent: isOpen ? 'initial' : 'center',
                px: 2.5,
              }}
            >
              <ListItemIcon
                 sx={{
                  minWidth: 0,
                  mr: isOpen ? 3 : 'auto',
                  justifyContent: 'center',
                }}
              >
                {item.icon}
              </ListItemIcon>
              <ListItemText primary={item.text} sx={{ opacity: isOpen ? 1 : 0 }} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>

      {/* Profile Section */}
      <Box sx={{ mt: 'auto', p: 2 }}>
        <Divider sx={{ mb: 2 }} />
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }} onClick={handleProfileClick}>
          <Avatar 
            src={profileImage}
            sx={{ width: 40, height: 40 }}
          />
          {isOpen && (
            <Box sx={{ flex: 1 }}>
              <Typography variant="subtitle2">BJE</Typography>
              <Typography variant="caption" color="text.secondary">
                Admin
              </Typography>
            </Box>
          )}
          {isOpen && (
            <IconButton size="small">
              <EditIcon fontSize="small" />
            </IconButton>
          )}
        </Box>
        <Menu
          anchorEl={anchorEl}
          open={isMenuOpen}
          onClose={handleMenuClose}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
        >
          <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
          <MenuItem onClick={handleMenuClose}>Settings</MenuItem>
          <MenuItem onClick={handleMenuClose}>Log out</MenuItem>
        </Menu>
      </Box>
    </Drawer>
  );
} 