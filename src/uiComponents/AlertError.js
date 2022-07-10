import { useContext, forwardRef } from "react";
import { Context } from "../context/authContext";
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

const vertical = 'bottom';
const horizontal = 'right';
const duration = 3000;

const AlertStyled = forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function AlertError(props) {
    const {openAlertError, setOpenAlertError} = useContext(Context);

    const handleCloseAlert = (event, reason) => {
        if (reason === 'clickaway') return;
        setOpenAlertError(false);
    };

    return (
        <Snackbar 
            anchorOrigin={{ vertical, horizontal }} 
            open={openAlertError}
            autoHideDuration={duration}
            onClose={handleCloseAlert}
        >
            <AlertStyled 
                onClose={handleCloseAlert}
                severity="error" 
                sx={{ width: '100%' }}
            >
                {props.message}
            </AlertStyled>
        </Snackbar>
    );
}

export default AlertError;