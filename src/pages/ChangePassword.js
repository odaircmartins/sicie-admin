// Third Party Settings
import React, { useState, forwardRef } from "react";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import { styled } from '@mui/material/styles';

// Own Settings
import api from "../config/api";

//Styles
const ButtonStyled = styled(Button)({
    width: '210px'
});

//Component
const User = () => {
    //States
    const [alertSuccess, setAlertSuccess] = useState(false);
    const [alertError, setAlertError] = useState(false);
    const [messageError, setMessageError] = useState('erro');
    const [loading, setLoading] = useState(false);
    const [newPassword, setNewPassword] = useState('');

    //Handles
    const handleShowAlertSuccess = () => {
        setAlertSuccess(true);
    };

    const handleShowAlertError = () => {
        setAlertError(true);
    };

    const handlePassword = (e) => {
        setNewPassword(e.target.value);
    }

    const handleCloseAlert = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
    
        setAlertSuccess(false);
        setAlertError(false);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);      
        
        const emailLogged = JSON.parse(localStorage.getItem('email'));

        api.put('/users', {email: emailLogged, password: newPassword})
            .then(response => {
                if (response.status === 200) {
                    setLoading(false);
                    setNewPassword('');
                    handleShowAlertSuccess();
                    //console.log(response.data);
                }
            })
            .catch(error => {
                setLoading(false);
                handleShowAlertError();
                setMessageError(error.response.data.message);
                console.log(error.response.data); 
            });
    }

    //Others
    const vertical = 'bottom';
    const horizontal = 'right';
    const Alert = forwardRef(function Alert(props, ref) {
        return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
    });

    return (
        <>
            <form onSubmit={handleSubmit}>
                <Grid container spacing={2} alignItems="center" direction="column">
                    <Grid item xs={3}>
                        <h3>Alterar Senha</h3>
                    </Grid>
                    <Grid item xs={3}>
                        <TextField type="password" size="small" id="outlined-basic" label="Senha" value={newPassword} name="password" required onChange={handlePassword || ''}/>
                    </Grid>
                    <Grid item xs={3}>
                        <ButtonStyled type="submit" variant="outlined">Confirmar</ButtonStyled>
                    </Grid>
                </Grid>
            </form>

            <Snackbar anchorOrigin={{ vertical, horizontal }} open={alertSuccess} autoHideDuration={6000} onClose={handleCloseAlert}>
                <Alert onClose={handleCloseAlert} severity="info" sx={{ width: '100%' }}>
                    Senha alterada com sucesso
                </Alert>
            </Snackbar>

            <Snackbar anchorOrigin={{ vertical, horizontal }} open={alertError} autoHideDuration={6000} onClose={handleCloseAlert}>
                <Alert onClose={handleCloseAlert} severity="error" sx={{ width: '100%' }}>
                    {messageError}
                </Alert>
            </Snackbar>

            <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={loading}
            >
                <CircularProgress color="inherit" />
            </Backdrop>
        </>
    )
}

export default User;