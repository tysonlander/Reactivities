//material-ui
import { styled } from '@mui/material/styles';

// third-party
import { SnackbarProvider } from 'notistack';

// project import
// import { useSelector } from 'store';
// @todo - refactor to use a store and mobx observer the store

// assets
// import { CheckCircleOutlined, CloseCircleOutlined, InfoCircleOutlined, WarningOutlined } from '@ant-design/icons';
import WarningRoundedIcon from '@mui/icons-material/WarningRounded';

// custom styles
const StyledSnackbarProvider = styled(SnackbarProvider)(({ theme }) => ({
  '&.notistack-MuiContent-default': {
    backgroundColor: theme.palette.primary.main
  },
  '&.notistack-MuiContent-error': {
    backgroundColor: theme.palette.error.main
  },
  '&.notistack-MuiContent-success': {
    backgroundColor: theme.palette.success.main
  },
  '&.notistack-MuiContent-info': {
    backgroundColor: theme.palette.info.main
  },
  '&.notistack-MuiContent-warning': {
    backgroundColor: theme.palette.warning.main
  }
}));

// ===========================|| SNACKBAR - NOTISTACK ||=========================== //

const Notistack = ({ children }: any) => {
//   const snackbar = useSelector((state) => state.snackbar); // original code from redux that I think can be refactored to use a store and mobx observer the store
const snackbar = {
    maxStack: 3,
    dense: false,
    iconVariant: 'useemojis'

}
  const iconSX = { marginRight: 8, fontSize: '1.15rem' };

  return (
    <StyledSnackbarProvider
      maxSnack={snackbar.maxStack}
      dense={snackbar.dense}
      iconVariant={
        snackbar.iconVariant === 'useemojis'
          ? {
              success: <WarningRoundedIcon style={iconSX} />,
              error: <WarningRoundedIcon style={iconSX} />,
              warning: <WarningRoundedIcon style={iconSX} />,
              info: <WarningRoundedIcon style={iconSX} />
            }
          : undefined
      }
      hideIconVariant={snackbar.iconVariant === 'hide' ? true : false}
    >
      {children}
    </StyledSnackbarProvider>
  );
};

export default Notistack;
