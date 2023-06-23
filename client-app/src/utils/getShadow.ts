// material-ui
import { alpha, Theme } from '@mui/material/styles';

// ==============================|| CUSTOM FUNCTION - COLOR SHADOWS ||============================== //

const getShadow = (theme: Theme, shadow: string) => {
    switch (shadow) {
        // @todo: uncomment this when shadows are defined in theme
        // case 'secondary':
        //     return theme.customShadows.secondary;
        // case 'error':
        //     return theme.customShadows.error;
        // case 'warning':
        //     return theme.customShadows.warning;
        // case 'info':
        //     return theme.customShadows.info;
        // case 'success':
        //     return theme.customShadows.success;
        // case 'primaryButton':
        //     return theme.customShadows.primaryButton;
        // case 'secondaryButton':
        //     return theme.customShadows.secondaryButton;
        // case 'errorButton':
        //     return theme.customShadows.errorButton;
        // case 'warningButton':
        //     return theme.customShadows.warningButton;
        // case 'infoButton':
        //     return theme.customShadows.infoButton;
        // case 'successButton':
        //     return theme.customShadows.successButton;
        default:
            return `0 14px 12px ${alpha(theme.palette.grey[500], 0.2)}`;
    }
};

export default getShadow;
