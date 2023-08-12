// material-ui
import { Theme, TypographyVariantsOptions } from '@mui/material/styles';

// types
import { FontFamily, ThemeMode } from 'types/config';

// ==============================|| DEFAULT THEME - TYPOGRAPHY  ||============================== //

const Typography = (mode: ThemeMode, fontFamily: FontFamily, theme: Theme): TypographyVariantsOptions => ({
    htmlFontSize: 16,
    fontFamily,
    fontWeightLight: 300,
    fontWeightRegular: 400,
    fontWeightMedium: 500,
    fontWeightBold: 600,
    // refactoring ui font size are: 12, 14, 16, 18, 20, 24, 30,36, 48, 60, 72
    // mui font size are: h1-6 96, 60, 48, 34, 24, 20
    h1: {
        // fontWeight: 600,
        fontSize: '2.375rem', // 38px
        lineHeight: 1.21
    },
    h2: {
        // fontWeight: 600,
        fontSize: '1.875rem', // 30px
        lineHeight: 1.27
    },
    h3: {
        // fontWeight: 600,
        fontSize: '1.5rem', // 24px
        lineHeight: 1.33
    },
    h4: {
        // fontWeight: 600,
        fontSize: '1.25rem', // 20px
        lineHeight: 1.4
    },
    h5: {
        // fontWeight: 600,
        fontSize: '1rem', // 16px
        lineHeight: 1.5
    },
    h6: {
        // fontWeight: 400,
        fontSize: '0.875rem', // 14px
        lineHeight: 1.57
    },
    caption: {
        // fontWeight: 400,
        fontSize: '0.75rem',
        lineHeight: 1.66
    },
    body1: {
        fontSize: '0.875rem', // 12.25px
        lineHeight: 1.57
    },
    body2: {
        fontSize: '0.75rem',
        lineHeight: 1.66
    },
    subtitle1: {
        // fontSize: '0.875rem', // 12.25px
        fontWeight: 600,
        lineHeight: 1.57
    },
    subtitle2: {
        // fontSize: '0.75rem',
        fontWeight: 500,
        lineHeight: 1.66
    },
    overline: {
        lineHeight: 1.66
    },
    button: {
        textTransform: 'capitalize'
    }
});

export default Typography;
