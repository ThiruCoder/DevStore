import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
    palette: {
        primary: {
            main: '#06b6d4',
            light: '#22d3ee',
            dark: '#0891b2',
        },
        secondary: {
            main: '#0f766e',
            light: '#14b8a6',
            dark: '#115e59',
        },
        error: {
            main: '#ef4444',
        },
        warning: {
            main: '#f97316',
        },
        success: {
            main: '#10b981',
        },
        background: {
            default: '#ffffff',
            paper: '#f8fafc',
        },
    },
    typography: {
        fontFamily: '"Inter", "Helvetica", "Arial", sans-serif',
        h1: {
            fontFamily: '"Playfair Display", serif',
            fontWeight: 700,
            letterSpacing: '-0.01em',
        },
        h2: {
            fontFamily: '"Playfair Display", serif',
            fontWeight: 700,
            letterSpacing: '-0.01em',
        },
        h3: {
            fontWeight: 600,
            letterSpacing: '-0.01em',
        },
        h4: {
            fontWeight: 600,
            letterSpacing: '-0.01em',
        },
        h5: {
            fontWeight: 600,
            letterSpacing: '-0.01em',
        },
        h6: {
            fontWeight: 600,
            letterSpacing: '-0.01em',
        },
        button: {
            fontWeight: 600,
            textTransform: 'none',
            letterSpacing: '0.02em',
        },
    },
    shape: {
        borderRadius: 12,
    },
    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    borderRadius: 50,
                    padding: '10px 24px',
                    boxShadow: '0 4px 14px 0 rgba(0, 0, 0, 0.1)',
                },
                contained: {
                    '&:hover': {
                        boxShadow: '0 6px 20px rgba(0, 0, 0, 0.15)',
                    },
                },
            },
        },
        MuiCard: {
            styleOverrides: {
                root: {
                    boxShadow: '0 10px 30px rgba(0, 0, 0, 0.05)',
                    borderRadius: 16,
                },
            },
        },
    },
});