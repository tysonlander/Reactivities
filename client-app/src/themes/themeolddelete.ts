import { createTheme } from '@mui/material/styles';
import { red } from '@mui/material/colors';

// A custom theme for this app
const theme = createTheme({
    palette: {
        primary: {
            main: red.A400,
        },
        secondary: {
            main: '#19857b',
        },
        error: {
            main: red.A400,
        },
    },
    typography: {
        button: {
            textTransform: 'none', // Disable capitalization
        },
    },
    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    '&:hover': {
                        '@media (hover: none)': {
                            backgroundColor: 'transparent',
                        },
                    },
                    // boxShadow: 'none', // Disable box shadow on buttons globally
                },
            },
            defaultProps: {
                disableRipple: true, // Disable button ripple effect globally
            },
        },
    },
});

export default theme;