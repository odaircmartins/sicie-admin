import { Context } from "../context/authContext";
import { useContext } from "react";
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';

function Loading() {
    const {openLoading} = useContext(Context);

    return (
        <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open={openLoading}>
            <CircularProgress color="inherit" />
        </Backdrop>
    );
}

export default Loading;