import { SyntheticEvent } from 'react';
import { observer } from "mobx-react-lite";

// material-ui
import { Alert, Button, Fade, Grow, Slide, SlideProps } from '@mui/material';
import MuiSnackbar from '@mui/material/Snackbar';

// project-import
import IconButton from './IconButton';
// import { dispatch, useSelector } from 'store';
// import { closeSnackbar } from 'store/reducers/snackbar';
import { useStore } from "stores/store";

// assets
// import { CloseOutlined } from '@ant-design/icons';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';

// types
import { KeyedObject } from 'types/root';

// animation function
function TransitionSlideLeft(props: SlideProps) {
    return <Slide {...props} direction="left" />;
}

function TransitionSlideUp(props: SlideProps) {
    return <Slide {...props} direction="up" />;
}

function TransitionSlideRight(props: SlideProps) {
    return <Slide {...props} direction="right" />;
}

function TransitionSlideDown(props: SlideProps) {
    return <Slide {...props} direction="down" />;
}

function GrowTransition(props: SlideProps) {
    return <Grow {...props} />;
}

// animation options
const animation: KeyedObject = {
    SlideLeft: TransitionSlideLeft,
    SlideUp: TransitionSlideUp,
    SlideRight: TransitionSlideRight,
    SlideDown: TransitionSlideDown,
    Grow: GrowTransition,
    Fade
};

// ==============================|| SNACKBAR ||============================== //

export default observer(function Snackbar() {
    const { snackbarStore } = useStore();
    // const snackbar = useSelector((state) => state.snackbar);
    const { actionButton, anchorOrigin, alert, close, message, open, transition, variant, closeSnackbar } = snackbarStore;

    const handleClose = (event: SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }
        closeSnackbar();
        // dispatch(closeSnackbar());
    };

    return (
        <>
            {/* default snackbar */}
            {variant === 'default' && (
                <MuiSnackbar
                    anchorOrigin={anchorOrigin}
                    open={open}
                    autoHideDuration={6000}
                    onClose={handleClose}
                    message={message}
                    TransitionComponent={animation[transition]}
                    action={
                        <>
                            <Button color="secondary" size="small" onClick={handleClose}>
                                UNDO
                            </Button>
                            <IconButton size="small" aria-label="close" color="inherit" onClick={handleClose} sx={{ mt: 0.25 }}>
                                <CloseRoundedIcon />
                            </IconButton>
                        </>
                    }
                />
            )}

            {/* alert snackbar */}
            {variant === 'alert' && (
                <MuiSnackbar
                    TransitionComponent={animation[transition]}
                    anchorOrigin={anchorOrigin}
                    open={open}
                    autoHideDuration={6000}
                    onClose={handleClose}
                >
                    <Alert
                        variant={alert.variant}
                        color={alert.color}
                        action={
                            <>
                                {actionButton !== false && (
                                    <Button color={alert.color} size="small" onClick={handleClose}>
                                        UNDO
                                    </Button>
                                )}
                                {close !== false && (
                                    <IconButton
                                        sx={{ mt: 0.25 }}
                                        size="small"
                                        aria-label="close"
                                        variant="contained"
                                        color={alert.color}
                                        onClick={handleClose}
                                    >
                                        <CloseRoundedIcon />
                                    </IconButton>
                                )}
                            </>
                        }
                        sx={{
                            ...(alert.variant === 'outlined' && {
                                bgcolor: 'grey.0'
                            })
                        }}
                    >
                        {message}
                    </Alert>
                </MuiSnackbar>
            )}
        </>
    );
});


