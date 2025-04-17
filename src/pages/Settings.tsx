import React, { useState } from 'react';
import {
  Box,
  Paper,
  Typography,
  TextField,
  Button,
  Grid,
  Switch,
  FormControlLabel,
  Divider,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  Snackbar,
  Alert,
  Avatar,
  Stack,
  InputLabel,
  Select,
  MenuItem,
  FormControl,
} from '@mui/material';
import {
  Person as PersonIcon,
  Notifications as NotificationsIcon,
  DisplaySettings as DisplayIcon,
  Save as SaveIcon,
} from '@mui/icons-material';
import Layout from '../components/layout/Layout';

interface Settings {
  notifications: {
    email: boolean;
    push: boolean;
    sms: boolean;
  };
  display: {
    darkMode: boolean;
    fontSize: string;
  };
  profile: {
    name: string;
    email: string;
    bio: string;
  };
}

const defaultSettings: Settings = {
  notifications: {
    email: true,
    push: true,
    sms: false,
  },
  display: {
    darkMode: false,
    fontSize: 'medium',
  },
  profile: {
    name: 'John Doe',
    email: 'john.doe@example.com',
    bio: 'Frontend Developer with a passion for creating beautiful user interfaces.',
  },
};

const Settings: React.FC = () => {
  const [settings, setSettings] = useState<Settings>(defaultSettings);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success' as 'success' | 'error',
  });

  const handleNotificationChange = (type: keyof Settings['notifications']) => {
    setSettings((prev) => ({
      ...prev,
      notifications: {
        ...prev.notifications,
        [type]: !prev.notifications[type],
      },
    }));
  };

  const handleDisplayChange = (type: keyof Settings['display'], value: any) => {
    setSettings((prev) => ({
      ...prev,
      display: {
        ...prev.display,
        [type]: value,
      },
    }));
  };

  const handleProfileChange = (type: keyof Settings['profile'], value: string) => {
    setSettings((prev) => ({
      ...prev,
      profile: {
        ...prev.profile,
        [type]: value,
      },
    }));
  };

  const handleSave = () => {
    localStorage.setItem('settings', JSON.stringify(settings));
    setSnackbar({
      open: true,
      message: 'Settings saved successfully',
      severity: 'success',
    });
  };

  const handleSnackbarClose = () => {
    setSnackbar((prev) => ({ ...prev, open: false }));
  };

  return (
    <Layout>
      <Box sx={{ p: 4 }}>
        <Stack direction="row" spacing={2} alignItems="center" sx={{ mb: 4 }}>
          <Avatar sx={{ width: 56, height: 56, bgcolor: 'primary.main' }}>
            <PersonIcon sx={{ fontSize: 32 }} />
          </Avatar>
          <Box>
            <Typography variant="h4" sx={{ fontWeight: 500, color: '#2f2f2f' }}>
              Settings
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Manage your account settings and preferences
            </Typography>
          </Box>
        </Stack>

        <Grid container spacing={4}>
          {/* Profile Settings */}
          <Grid item xs={12} md={6}>
            <Paper 
              elevation={0}
              sx={{ 
                p: 3,
                border: '1px solid #e0e0e0',
                borderRadius: '10px',
                height: '100%'
              }}
            >
              <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 3 }}>
                <PersonIcon color="primary" />
                <Typography variant="h6" sx={{ fontWeight: 500, color: '#2f2f2f' }}>
                  Profile Settings
                </Typography>
              </Stack>
              <Stack spacing={3}>
                <TextField
                  fullWidth
                  label="Name"
                  value={settings.profile.name}
                  onChange={(e) => handleProfileChange('name', e.target.value)}
                  size="small"
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      borderRadius: '8px',
                    },
                  }}
                />
                <TextField
                  fullWidth
                  label="Email"
                  type="email"
                  value={settings.profile.email}
                  onChange={(e) => handleProfileChange('email', e.target.value)}
                  size="small"
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      borderRadius: '8px',
                    },
                  }}
                />
                <TextField
                  fullWidth
                  label="Bio"
                  multiline
                  rows={4}
                  value={settings.profile.bio}
                  onChange={(e) => handleProfileChange('bio', e.target.value)}
                  size="small"
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      borderRadius: '8px',
                    },
                  }}
                />
              </Stack>
            </Paper>
          </Grid>

          {/* Notification & Display Settings */}
          <Grid item xs={12} md={6}>
            <Stack spacing={3}>
              {/* Notification Settings */}
              <Paper 
                elevation={0}
                sx={{ 
                  p: 3,
                  border: '1px solid #e0e0e0',
                  borderRadius: '10px'
                }}
              >
                <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 3 }}>
                  <NotificationsIcon color="primary" />
                  <Typography variant="h6" sx={{ fontWeight: 500, color: '#2f2f2f' }}>
                    Notification Settings
                  </Typography>
                </Stack>
                <List>
                  <ListItem sx={{ px: 0 }}>
                    <ListItemText 
                      primary="Email Notifications" 
                      secondary="Receive notifications via email"
                    />
                    <ListItemSecondaryAction>
                      <Switch
                        edge="end"
                        checked={settings.notifications.email}
                        onChange={() => handleNotificationChange('email')}
                      />
                    </ListItemSecondaryAction>
                  </ListItem>
                  <ListItem sx={{ px: 0 }}>
                    <ListItemText 
                      primary="Push Notifications" 
                      secondary="Receive push notifications"
                    />
                    <ListItemSecondaryAction>
                      <Switch
                        edge="end"
                        checked={settings.notifications.push}
                        onChange={() => handleNotificationChange('push')}
                      />
                    </ListItemSecondaryAction>
                  </ListItem>
                  <ListItem sx={{ px: 0 }}>
                    <ListItemText 
                      primary="SMS Notifications" 
                      secondary="Receive notifications via SMS"
                    />
                    <ListItemSecondaryAction>
                      <Switch
                        edge="end"
                        checked={settings.notifications.sms}
                        onChange={() => handleNotificationChange('sms')}
                      />
                    </ListItemSecondaryAction>
                  </ListItem>
                </List>
              </Paper>

              {/* Display Settings */}
              <Paper 
                elevation={0}
                sx={{ 
                  p: 3,
                  border: '1px solid #e0e0e0',
                  borderRadius: '10px'
                }}
              >
                <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 3 }}>
                  <DisplayIcon color="primary" />
                  <Typography variant="h6" sx={{ fontWeight: 500, color: '#2f2f2f' }}>
                    Display Settings
                  </Typography>
                </Stack>
                <List>
                  <ListItem sx={{ px: 0 }}>
                    <ListItemText 
                      primary="Dark Mode" 
                      secondary="Switch between light and dark theme"
                    />
                    <ListItemSecondaryAction>
                      <Switch
                        edge="end"
                        checked={settings.display.darkMode}
                        onChange={(e) => handleDisplayChange('darkMode', e.target.checked)}
                      />
                    </ListItemSecondaryAction>
                  </ListItem>
                  <ListItem sx={{ px: 0 }}>
                    <ListItemText 
                      primary="Font Size" 
                      secondary="Adjust the size of text throughout the application"
                    />
                    <ListItemSecondaryAction>
                      <FormControl size="small" sx={{ minWidth: 120 }}>
                        <Select
                          value={settings.display.fontSize}
                          onChange={(e) => handleDisplayChange('fontSize', e.target.value)}
                          sx={{
                            borderRadius: '8px',
                            '& .MuiSelect-select': {
                              py: 1,
                            },
                          }}
                        >
                          <MenuItem value="small">Small</MenuItem>
                          <MenuItem value="medium">Medium</MenuItem>
                          <MenuItem value="large">Large</MenuItem>
                        </Select>
                      </FormControl>
                    </ListItemSecondaryAction>
                  </ListItem>
                </List>
              </Paper>
            </Stack>
          </Grid>
        </Grid>

        <Box sx={{ mt: 4, display: 'flex', justifyContent: 'flex-end' }}>
          <Button
            variant="contained"
            startIcon={<SaveIcon />}
            onClick={handleSave}
            sx={{
              px: 4,
              py: 1,
              borderRadius: '8px',
              textTransform: 'none',
              fontWeight: 500,
            }}
          >
            Save Changes
          </Button>
        </Box>

        <Snackbar
          open={snackbar.open}
          autoHideDuration={6000}
          onClose={handleSnackbarClose}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        >
          <Alert 
            onClose={handleSnackbarClose} 
            severity={snackbar.severity}
            sx={{ 
              borderRadius: '8px',
              boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
            }}
          >
            {snackbar.message}
          </Alert>
        </Snackbar>
      </Box>
    </Layout>
  );
};

export default Settings; 