import {
  Box,
  Typography,
  Paper,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListItemButton,
  TextField,
  Button,
  Divider,
  Avatar,
  Switch,
  FormControlLabel,
  FormGroup,
  Stack,
  Alert,
  Snackbar,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  FormHelperText,
  IconButton,
  useTheme
} from '@mui/material';
import {
  Person as ProfileIcon,
  AccountCircle as AccountIcon,
  Palette as AppearanceIcon,
  Notifications as NotificationsIcon,
  DesktopWindows as DisplayIcon,
  Edit as EditIcon,
  PhotoCamera as CameraIcon,
  Save as SaveIcon,
  Cancel as CancelIcon,
  DarkMode as DarkModeIcon,
  LightMode as LightModeIcon
} from '@mui/icons-material';
import { useState, useRef } from 'react';

const menuItems = [
  { text: 'Profile', icon: <ProfileIcon />, id: 'profile' },
  { text: 'Account', icon: <AccountIcon />, id: 'account' },
  { text: 'Appearance', icon: <AppearanceIcon />, id: 'appearance' },
  { text: 'Notifications', icon: <NotificationsIcon />, id: 'notifications' },
  { text: 'Display', icon: <DisplayIcon />, id: 'display' }
];

export default function Settings() {
  const theme = useTheme();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [selectedSection, setSelectedSection] = useState('profile');
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
  
  // Profile Settings
  const [username, setUsername] = useState('BJE');
  const [email, setEmail] = useState('bje@gmail.com');
  const [bio, setBio] = useState('');
  const [profileImage, setProfileImage] = useState('/assets/images/bje-logo.png');

  // Account Settings
  const [password, setPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  // Appearance Settings
  const [darkMode, setDarkMode] = useState(false);
  const [fontSize, setFontSize] = useState('medium');
  const [colorScheme, setColorScheme] = useState('blue');

  // Notification Settings
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [pushNotifications, setPushNotifications] = useState(true);
  const [orderUpdates, setOrderUpdates] = useState(true);
  const [productUpdates, setProductUpdates] = useState(true);

  // Display Settings
  const [compactMode, setCompactMode] = useState(false);
  const [showStatistics, setShowStatistics] = useState(true);
  const [language, setLanguage] = useState('en');

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setProfileImage(e.target?.result as string);
        showSnackbar('Profile image updated successfully', 'success');
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSaveProfile = () => {
    // Validate and save profile changes
    if (!username) {
      showSnackbar('Username is required', 'error');
      return;
    }
    showSnackbar('Profile updated successfully', 'success');
  };

  const handleChangePassword = () => {
    // Validate password change
    if (!password || !newPassword || !confirmPassword) {
      showSnackbar('All password fields are required', 'error');
      return;
    }
    if (newPassword !== confirmPassword) {
      showSnackbar('New passwords do not match', 'error');
      return;
    }
    showSnackbar('Password changed successfully', 'success');
    setPassword('');
    setNewPassword('');
    setConfirmPassword('');
  };

  const showSnackbar = (message: string, severity: 'success' | 'error') => {
    setSnackbar({ open: true, message, severity });
  };

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  const renderContent = () => {
    switch (selectedSection) {
      case 'profile':
        return (
          <Box>
            <Typography variant="h6" sx={{ mb: 3 }}>Profile Settings</Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 4 }}>
              This is how others will see you on the site.
            </Typography>

            <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 4 }}>
              <Box sx={{ flex: { xs: '1', md: '0 0 33%' }, textAlign: 'center' }}>
                <Box sx={{ position: 'relative', width: 120, height: 120, mx: 'auto', mb: 2 }}>
                  <Avatar
                    src={profileImage}
                    sx={{ width: '100%', height: '100%' }}
                  />
                  <IconButton
                    sx={{
                      position: 'absolute',
                      bottom: 0,
                      right: 0,
                      backgroundColor: 'primary.main',
                      '&:hover': { backgroundColor: 'primary.dark' },
                    }}
                    onClick={() => fileInputRef.current?.click()}
                  >
                    <CameraIcon />
                  </IconButton>
                  <input
                    type="file"
                    hidden
                    ref={fileInputRef}
                    accept="image/*"
                    onChange={handleImageUpload}
                  />
                </Box>
                <Typography variant="caption" color="text.secondary">
                  Click the camera icon to change your profile picture
                </Typography>
              </Box>

              <Box sx={{ flex: { xs: '1', md: '0 0 67%' } }}>
                <Stack spacing={3}>
                  <TextField
                    label="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    fullWidth
                    required
                    helperText="This is your public display name. It can be your real name or a pseudonym."
                  />

                  <TextField
                    label="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    fullWidth
                    required
                    type="email"
                    helperText="Your email address will not be publicly displayed."
                  />

                  <TextField
                    label="Bio"
                    value={bio}
                    onChange={(e) => setBio(e.target.value)}
                    multiline
                    rows={4}
                    fullWidth
                    helperText="Write a few sentences about yourself."
                  />

                  <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
                    <Button 
                      variant="outlined" 
                      startIcon={<CancelIcon />}
                      onClick={() => {
                        setUsername('BJE');
                        setEmail('bje@gmail.com');
                        setBio('');
                      }}
                    >
                      Cancel
                    </Button>
                    <Button 
                      variant="contained" 
                      startIcon={<SaveIcon />}
                      onClick={handleSaveProfile}
                    >
                      Save Changes
                    </Button>
                  </Box>
                </Stack>
              </Box>
            </Box>
          </Box>
        );

      case 'account':
        return (
          <Box>
            <Typography variant="h6" sx={{ mb: 3 }}>Account Settings</Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 4 }}>
              Manage your account security settings.
            </Typography>

            <Paper sx={{ p: 3, mb: 3 }}>
              <Typography variant="subtitle1" gutterBottom>Change Password</Typography>
              <Stack spacing={3}>
                <TextField
                  label="Current Password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  fullWidth
                  required
                />
                <TextField
                  label="New Password"
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  fullWidth
                  required
                />
                <TextField
                  label="Confirm New Password"
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  fullWidth
                  required
                />
                <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                  <Button 
                    variant="contained" 
                    onClick={handleChangePassword}
                    startIcon={<SaveIcon />}
                  >
                    Update Password
                  </Button>
                </Box>
              </Stack>
            </Paper>

            <Paper sx={{ p: 3 }}>
              <Typography variant="subtitle1" gutterBottom>Account Preferences</Typography>
              <FormGroup>
                <FormControlLabel
                  control={<Switch checked={true} disabled />}
                  label="Two-Factor Authentication"
                />
                <FormControlLabel
                  control={<Switch checked={true} />}
                  label="Account Activity Notifications"
                />
              </FormGroup>
            </Paper>
          </Box>
        );

      case 'appearance':
        return (
          <Box>
            <Typography variant="h6" sx={{ mb: 3 }}>Appearance Settings</Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 4 }}>
              Customize how the dashboard looks and feels.
            </Typography>

            <Stack spacing={3}>
              <Paper sx={{ p: 3 }}>
                <Typography variant="subtitle1" gutterBottom>Theme</Typography>
                <FormGroup>
                  <FormControlLabel
                    control={
                      <Switch 
                        checked={darkMode}
                        onChange={(e) => {
                          setDarkMode(e.target.checked);
                          showSnackbar('Theme updated successfully', 'success');
                        }}
                      />
                    }
                    label={
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        {darkMode ? <DarkModeIcon /> : <LightModeIcon />}
                        {darkMode ? "Dark Mode" : "Light Mode"}
                      </Box>
                    }
                  />
                </FormGroup>
              </Paper>

              <Paper sx={{ p: 3 }}>
                <Typography variant="subtitle1" gutterBottom>Font Size</Typography>
                <FormControl fullWidth>
                  <Select
                    value={fontSize}
                    onChange={(e) => {
                      setFontSize(e.target.value);
                      showSnackbar('Font size updated successfully', 'success');
                    }}
                  >
                    <MenuItem value="small">Small</MenuItem>
                    <MenuItem value="medium">Medium</MenuItem>
                    <MenuItem value="large">Large</MenuItem>
                  </Select>
                </FormControl>
              </Paper>

              <Paper sx={{ p: 3 }}>
                <Typography variant="subtitle1" gutterBottom>Color Scheme</Typography>
                <FormControl fullWidth>
                  <Select
                    value={colorScheme}
                    onChange={(e) => {
                      setColorScheme(e.target.value);
                      showSnackbar('Color scheme updated successfully', 'success');
                    }}
                  >
                    <MenuItem value="blue">Blue</MenuItem>
                    <MenuItem value="purple">Purple</MenuItem>
                    <MenuItem value="green">Green</MenuItem>
                  </Select>
                </FormControl>
              </Paper>
            </Stack>
          </Box>
        );

      case 'notifications':
        return (
          <Box>
            <Typography variant="h6" sx={{ mb: 3 }}>Notification Settings</Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 4 }}>
              Choose what notifications you want to receive.
            </Typography>

            <Stack spacing={3}>
              <Paper sx={{ p: 3 }}>
                <Typography variant="subtitle1" gutterBottom>Email Notifications</Typography>
                <FormGroup>
                  <FormControlLabel
                    control={
                      <Switch 
                        checked={emailNotifications}
                        onChange={(e) => {
                          setEmailNotifications(e.target.checked);
                          showSnackbar('Email notification settings updated', 'success');
                        }}
                      />
                    }
                    label="Enable Email Notifications"
                  />
                  <FormControlLabel
                    control={
                      <Switch 
                        checked={orderUpdates}
                        onChange={(e) => {
                          setOrderUpdates(e.target.checked);
                          showSnackbar('Order updates settings updated', 'success');
                        }}
                      />
                    }
                    label="Order Updates"
                  />
                  <FormControlLabel
                    control={
                      <Switch 
                        checked={productUpdates}
                        onChange={(e) => {
                          setProductUpdates(e.target.checked);
                          showSnackbar('Product updates settings updated', 'success');
                        }}
                      />
                    }
                    label="Product Updates"
                  />
                </FormGroup>
              </Paper>

              <Paper sx={{ p: 3 }}>
                <Typography variant="subtitle1" gutterBottom>Push Notifications</Typography>
                <FormGroup>
                  <FormControlLabel
                    control={
                      <Switch 
                        checked={pushNotifications}
                        onChange={(e) => {
                          setPushNotifications(e.target.checked);
                          showSnackbar('Push notification settings updated', 'success');
                        }}
                      />
                    }
                    label="Enable Push Notifications"
                  />
                </FormGroup>
              </Paper>
            </Stack>
          </Box>
        );

      case 'display':
        return (
          <Box>
            <Typography variant="h6" sx={{ mb: 3 }}>Display Settings</Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 4 }}>
              Customize your dashboard display preferences.
            </Typography>

            <Stack spacing={3}>
              <Paper sx={{ p: 3 }}>
                <Typography variant="subtitle1" gutterBottom>Layout Preferences</Typography>
                <FormGroup>
                  <FormControlLabel
                    control={
                      <Switch 
                        checked={compactMode}
                        onChange={(e) => {
                          setCompactMode(e.target.checked);
                          showSnackbar('Layout preference updated', 'success');
                        }}
                      />
                    }
                    label="Compact Mode"
                  />
                  <FormControlLabel
                    control={
                      <Switch 
                        checked={showStatistics}
                        onChange={(e) => {
                          setShowStatistics(e.target.checked);
                          showSnackbar('Statistics display updated', 'success');
                        }}
                      />
                    }
                    label="Show Statistics"
                  />
                </FormGroup>
              </Paper>

              <Paper sx={{ p: 3 }}>
                <Typography variant="subtitle1" gutterBottom>Language</Typography>
                <FormControl fullWidth>
                  <Select
                    value={language}
                    onChange={(e) => {
                      setLanguage(e.target.value);
                      showSnackbar('Language updated successfully', 'success');
                    }}
                  >
                    <MenuItem value="en">English</MenuItem>
                    <MenuItem value="es">Spanish</MenuItem>
                    <MenuItem value="fr">French</MenuItem>
                  </Select>
                </FormControl>
              </Paper>
            </Stack>
          </Box>
        );

      default:
        return null;
    }
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Settings
      </Typography>
      <Typography variant="body1" color="text.secondary" paragraph>
        Manage your account settings and preferences.
      </Typography>

      <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 3 }}>
        <Box sx={{ width: { xs: '100%', md: '25%' } }}>
          <Paper>
            <List component="nav">
              {menuItems.map((item) => (
                <ListItem key={item.id} disablePadding>
                  <ListItemButton
                    selected={selectedSection === item.id}
                    onClick={() => setSelectedSection(item.id)}
                  >
                    <ListItemIcon>{item.icon}</ListItemIcon>
                    <ListItemText primary={item.text} />
                  </ListItemButton>
                </ListItem>
              ))}
            </List>
          </Paper>
        </Box>
        <Box sx={{ width: { xs: '100%', md: '75%' } }}>
          <Paper sx={{ p: 3 }}>
            {renderContent()}
          </Paper>
        </Box>
      </Box>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert 
          onClose={handleCloseSnackbar} 
          severity={snackbar.severity as 'success' | 'error'} 
          sx={{ width: '100%' }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
} 