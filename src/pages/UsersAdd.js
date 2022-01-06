// Third Party Settings
import React, { useState, forwardRef } from "react";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import { styled } from '@mui/material/styles';

// Own Settings
import api from "../config/api";

//Styles
const FormControlLabelStyled = styled(FormControlLabel)({
    width: '199px'
});

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
    const [formValues, setFormValues] = useState({
        email: '',
        isAdmin: false
    });

    //Handles
    const handleShowAlertSuccess = () => {
        setAlertSuccess(true);
    };

    const handleShowAlertError = () => {
        setAlertError(true);
    };

    const handleCloseAlert = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
    
        setAlertSuccess(false);
        setAlertError(false);
    };

    const handleSwitchChange = (event) => {
        setFormValues({ ...formValues, 'isAdmin': event.target.checked });
    };

    const handleResetForm = () => {
        setFormValues({
            email: '',
            isAdmin: false
        })
    }

    const handleInputChange = (e) => {
        //Desestrutura o dado em 'name' e o valor do campo em uso
        const { name, value } = e.target;
        
        // Faz uma cópia do estado 'formValues' e substitui o 
        //'value' conforme o '[name]' do campo em uso
        setFormValues({ ...formValues, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);            

        api.post('/users', formValues)
            .then(response => {
                if (response.status === 201) {
                    setLoading(false);
                    handleResetForm();
                    handleShowAlertSuccess();
                    //console.log(response.data);
                }
            })
            .catch(error => {
                setLoading(false);
                handleShowAlertError();
                setMessageError(error.response.data.message);
                if( error.response ){
                    console.log(error.response.data); // => the response payload 
                }
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
                        <h3>Criar Usuário</h3>
                    </Grid>
                    <Grid item xs={3}>
                        <TextField size="small" id="outlined-basic" label="E-mail" value={formValues.email} name="email" required onChange={handleInputChange || ''}/>
                    </Grid>
                    <Grid item xs={3}>
                        <FormControlLabelStyled control={<Switch checked={formValues.isAdmin} onChange={handleSwitchChange || false}/>} label="Administrador" />
                    </Grid>
                    <Grid item xs={3}>
                        <ButtonStyled type="submit" variant="outlined">Confirmar</ButtonStyled>
                    </Grid>
                </Grid>
            </form>

            <Snackbar anchorOrigin={{ vertical, horizontal }} open={alertSuccess} autoHideDuration={6000} onClose={handleCloseAlert}>
                <Alert onClose={handleCloseAlert} severity="info" sx={{ width: '100%' }}>
                    Usuário criado e convite enviado por e-mail
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