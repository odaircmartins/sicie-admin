// Third Party Settings
import React, { useState, useContext } from "react";
import Grid from '@mui/material/Grid';

// Own Settings
import { Context } from "../context/authContext";
import api from "../config/api";
import ButtonMuiStyled from "../uiComponents/ButtonMuiStyled";
import TextFieldMuiStyled from "../uiComponents/TextFieldMuiStyled";
import Title from "../uiComponents/Title";
import Area from "../uiComponents/Area";
import AlertError from "../uiComponents/AlertError";
import AlertSuccess from "../uiComponents/AlertSuccess";
import Loading from "../uiComponents/Loading";

//Component
const User = () => {
    //States
    const { handleLogout, setOpenAlertError, setOpenAlertSuccess, setOpenLoading } = useContext(Context);
    const [ newPassword, setNewPassword ] = useState('');
    const [ messageError, setMessageError ] = useState('');

    //Handles
    const handlePassword = (e) => {
        setNewPassword(e.target.value);
    }
    
    const handleSubmit = (e) => {
        e.preventDefault();
        setOpenLoading(true); 

        const emailLogged = JSON.parse(localStorage.getItem('email'));

        api.put('/users', {email: emailLogged, password: newPassword})
            .then(response => {
                if (response.status === 200) {
                    setOpenLoading(false);
                    setNewPassword('');
                    setOpenAlertSuccess(true);
                }
            })
            .catch(error => {
                setOpenLoading(false);
                
                if(error.response.data.message === "Token invalid"){
                    handleLogout();
                } else {
                    setOpenAlertError(true);
                    setMessageError(error.response.data.message);
                }
            });
    }

    return (
        <>
        <Title subtitle="Usuário" title="Alterar Senha"/>

        <Area height={50}>
            <form onSubmit={handleSubmit}>
                <Grid container spacing={2} alignItems="right" direction="column">
                    <Grid item xs={12}>
                        <TextFieldMuiStyled type="password" id="outlined-basic" label="Senha" value={newPassword} name="password" required onChange={handlePassword || ''}/>
                    </Grid>
                    <Grid item xs={12}>
                        <ButtonMuiStyled size="large" type="submit" variant="outlined">Confirmar</ButtonMuiStyled>
                    </Grid>
                </Grid>
            </form>

            <Loading/>
            <AlertError message={messageError} />
            <AlertSuccess message="Senha alterada com sucesso" />
        </Area>
        </>
    )
}

export default User;