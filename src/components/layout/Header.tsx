import { useState } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Badge,
  Box,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText
} from '@mui/material';
import {
  Menu as MenuIcon,
  Notifications as NotificationsIcon,
  ShoppingCart as ShoppingCartIcon,
  WarningAmber as WarningIcon,
} from '@mui/icons-material';

interface HeaderProps {
  drawerWidth: number;
  handleSidebarToggle: () => void;
}

const notifications = [
  { id: 1, icon: <ShoppingCartIcon fontSize="small" />, title: 'New Order #ORD12352', time: '5 min ago' },
  { id: 2, icon: <WarningIcon fontSize="small" />, title: 'Low Stock: Hickory Smoked Beef', time: '1 hour ago' },
  { id: 3, icon: <ShoppingCartIcon fontSize="small" />, title: 'New Order #ORD12351', time: '2 hours ago' },
];

export default function Header({ handleSidebarToggle, drawerWidth }: HeaderProps) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const isMenuOpen = Boolean(anchorEl);

  const handleNotificationClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleNotificationClose = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar 
      position="fixed" 
      sx={{ 
        zIndex: (theme) => theme.zIndex.drawer + 1,
      }}
    >
      <Toolbar>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          edge="start"
          onClick={handleSidebarToggle}
          sx={{ mr: 2 }}
        >
          <MenuIcon />
        </IconButton>

        <Typography
          variant="h6"
          noWrap
          component="div"
          sx={{ display: { xs: 'none', sm: 'block' } }}
        >
          BJE Dashboard
        </Typography>
        
        <Box sx={{ flexGrow: 1 }} />
        <Box sx={{ display: 'flex' }}>
          <IconButton 
            size="large" 
            color="inherit"
            aria-label={`show ${notifications.length} new notifications`}
            onClick={handleNotificationClick}
          >
            <Badge badgeContent={notifications.length} color="error">
              <NotificationsIcon />
            </Badge>
          </IconButton>
        </Box>
      </Toolbar>

      <Menu
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        keepMounted
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        open={isMenuOpen}
        onClose={handleNotificationClose}
      >
        {notifications.map((notification) => (
          <MenuItem key={notification.id} onClick={handleNotificationClose}>
            <ListItemIcon>
              {notification.icon}
            </ListItemIcon>
            <ListItemText 
              primary={notification.title}
              secondary={notification.time}
              primaryTypographyProps={{ variant: 'body2' }}
              secondaryTypographyProps={{ variant: 'caption' }}
            />
          </MenuItem>
        ))}
      </Menu>
    </AppBar>
  );
} 