import { createTheme, alpha } from '@mui/material/styles';

const primaryMain = '#1976d2';
const secondaryMain = '#dc004e';
const actionHoverOpacity = 0.08;

export const theme = createTheme({
  palette: {
    primary: {
      main: primaryMain,
    },
    secondary: {
      main: secondaryMain,
    },
    background: {
      default: '#f5f5f5',
      paper: '#ffffff',
    },
    action: {
      hoverOpacity: actionHoverOpacity,
      active: 'rgba(0, 0, 0, 0.54)'
    }
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontSize: '2.5rem',
      fontWeight: 500,
    },
    h2: {
      fontSize: '2rem',
      fontWeight: 500,
    },
    h3: {
      fontSize: '1.75rem',
      fontWeight: 500,
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          textTransform: 'none',
          transition: 'transform 0.15s ease-in-out, background-color 0.15s ease-in-out',
          '&:hover': {
            transform: 'scale(1.03)',
          },
        },
        containedPrimary: {
           '&:hover': {
            backgroundColor: alpha(primaryMain, 0.9),
            boxShadow: 'none',
          }
        },
        containedSecondary: {
           '&:hover': {
            backgroundColor: alpha(secondaryMain, 0.9),
            boxShadow: 'none',
          }
        },
        text: {
          '&:hover': {
             backgroundColor: alpha(primaryMain, actionHoverOpacity),
          }
        },
         outlined: {
          '&:hover': {
             backgroundColor: alpha(primaryMain, actionHoverOpacity),
          }
        },
      },
    },
    MuiIconButton: {
      styleOverrides: {
        root: {
          transition: 'background-color 0.15s ease-in-out',
          '&:hover': {
            backgroundColor: alpha('rgba(0, 0, 0, 0.54)', actionHoverOpacity),
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
        },
      },
    },
  },
}); 