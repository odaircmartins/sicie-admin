import React, { useState, useContext, forwardRef } from "react";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import styled from "styled-components";
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import { AiOutlineMail, AiOutlineUnlock, AiOutlineEyeInvisible, AiOutlineEye } from "react-icons/ai";

import { Context } from "../context/authContext";
import { breakpoints as bp } from "../config/globalStyle";

const Container = styled.div`
    font-family: 'Poppins', sans-serif;
    font-size: 1rem;
    min-height: 100vh;
    background: #fff;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const Box = styled.div`
    z-index: 999;
    background: #fff;
    box-shadow: 0 5px 25px rgb(0 0 0 / 15%);
    width: 350px;
    padding: 50px 40px;
    border-radius: 5px;
    overflow: hidden;

    @media(max-width: ${bp.desktop}){
        box-shadow: none;
    }
`;

const Field = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    border-bottom: ${p => p.selected ? '2px solid var(--color-two);' : '2px solid #eee'};
    margin-bottom: 25px;
`;

const Input = styled.input`
    border: none;
    outline: none;
    background: none;
    width: 100%;
    font-size: 1em;
    padding-bottom: 5px;   
    
    ::placeholder{
        color: #828da0;
        font-size: 0.85em;
    }
`;

const EyeBtn = styled.div`
    cursor: pointer;
`;

const ForgotLink = styled.div`
    text-align: right;
    transform: translateY(-10px);
`;

const ForgotLinkElement = styled.a`
    color: var(--color-two);
    font-size: 0.8em;
    text-decoration: none;
    font-weight: 500;

    &:focus, &:hover, &:visited, &:link, &:active {
        text-decoration: none;
        color: var(--color-two);
    }
`;

const SubmitButton = styled.input`
    background: var(--color-two);
    color: #fff;
    border: none;
    outline: none;
    width: 120px;
    height: 35px;
    border-radius: 5px;
    font-size: 0.85em;
    font-weight: 500;
    margin-top: 5px;
    cursor: pointer;
`;

const Logo = styled.div`
    display: flex;
    justify-content: center;
    margin-bottom: 50px;
`;

let iconStyles = { 
    color: "#828da0", 
    marginRight: "10px", 
    paddingBottom: "5px", 
    fontSize: "1.3em"
};

let iconStylesSelected = { 
    color: "#FF7F50", 
    marginRight: "10px", 
    paddingBottom: "5px", 
    fontSize: "1.3em"
};

const Login = () => {
    //States
    const [ newPassword, setNewPassword ] = useState('');
    const [ newPasswordRepeated, setNewPasswordRepeated ] = useState('');
    const [ changePassword, setChangePassword ] = useState(false);
    const [ emailToRecoverPassword, setEmailToRecoverPassword ] = useState('');
    const [ forgotPassword, setForgotPassword ] = useState(false);
    const [ alertSuccess, setAlertSuccess ] = useState(false);
    const [ alertError, setAlertError ] = useState(false);
    const [ messageError, setMessageError ] = useState('Erro');
    const [ messageSuccess, setMessageSuccess ] = useState('OK');
    const [ loading, setLoading ] = useState(false);
    const [ emailSelected, setEmailSelected ] = useState(0);
    const [ passwordSelected, setPasswordSelected ] = useState(0);
    const [ eyeClicked, setEyeClicked ] = useState(true);
    const [ formValues, setFormValues ] = useState({
        email: '',
        password: ''
    });
    const { handleLogin, handleChangeTemporaryPassword, handleForgotPassword } = useContext(Context);
    
    //Handles
    const handleOpenChangePassword = () => {
        setChangePassword(true);
    };
  
    const handleCloseChangePassword = () => {
        setChangePassword(false);
    };

    const handleOpenForgotPassword = () => {
        setForgotPassword(true);
    };

    const handleCloseForgotPassword = () => {
        setForgotPassword(false);
    };

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

    const handleNewPassword = (e) => {
        setNewPassword(e.target.value);
    };

    const handleEmailToRecoverPassword = (e) => {
        setEmailToRecoverPassword(e.target.value);
    };

    const handleNewPasswordRepeated = (e) => {
        setNewPasswordRepeated(e.target.value);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormValues({...formValues, [name]: value});
    };

    const handleSubmit = async (e) => {  
        e.preventDefault();     
        setLoading(true);

        let resultado = await handleLogin(formValues);

        setLoading(false);  
        if(resultado === 'Senha é temporária'){             
            handleOpenChangePassword();            
        }else{
            setMessageError(resultado);
            handleShowAlertError();
        }
    };

    const handleSubmitChangePassword = async (e) => {  
        e.preventDefault();     
        setLoading(true);  

        if(newPassword === '' || 
           newPasswordRepeated === '' || 
           newPassword !== newPasswordRepeated){   
            setLoading(false);  
            setMessageError('Senhas informadas não coincidem');                
            handleShowAlertError();
        } else {
            let resultado = await handleChangeTemporaryPassword({
                email: formValues.email,
                temporaryPassword: formValues.password,
                newPassword: newPassword
            });
            
            setLoading(false);  

            if(resultado === 'Sucesso'){
                formValues.password = newPassword; 
                setMessageSuccess('Senha alterada com sucesso');
                handleCloseChangePassword();
                handleShowAlertSuccess();                
            } else {
                setMessageError('Resultado'); 
                handleShowAlertError();            
            }
        }
    };

    const handleSubmitForgotPassword = async (e) => {  
        e.preventDefault();     
        setLoading(true);  

        if(emailToRecoverPassword === ''){   
            setLoading(false);  
            setMessageError('Informe um endereço de e-mail');                
            handleShowAlertError();
        } else {
            let resultado = await handleForgotPassword({
                email: emailToRecoverPassword
            });
            
            setLoading(false);  

            if(resultado === 'Sucesso'){
                setMessageSuccess('E-mail enviado sucesso para ' + emailToRecoverPassword);
                handleCloseForgotPassword();
                handleShowAlertSuccess();                
            } else {
                setMessageError(resultado); 
                handleShowAlertError();            
            }
        }
    };

    //Others
    const vertical = 'bottom';
    const horizontal = 'right';
    const Alert = forwardRef(function Alert(props, ref) {
        return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
    });
    
    return (      
        <>
        <Container>            
            <Box>
                <Logo><img src={"./img/logo.png"} alt="Logo"/></Logo>
                <form onSubmit={handleSubmit}>
                    <Field 
                        selected ={emailSelected}
                        onFocus = {()=> setEmailSelected(Number(1))}
                        onBlur = {()=> setEmailSelected(Number(0))}
                    >
                        <AiOutlineMail style ={ emailSelected === 1 ? iconStylesSelected : iconStyles }/>
                        <Input 
                            type="email" 
                            placeholder="Email" 
                            name="email"                            
                            onChange={handleInputChange || ''} required
                        />                        
                    </Field>
                    <Field
                        selected ={passwordSelected}
                        onFocus = {()=> setPasswordSelected(Number(1))}
                        onBlur = {()=> setPasswordSelected(Number(0))}
                    >
                        <AiOutlineUnlock style ={ passwordSelected === 1 ? iconStylesSelected : iconStyles }/>
                        <Input 
                            className="password-input" 
                            type= { eyeClicked ? "password" : "text"} 
                            name="password"
                            placeholder="Password" 
                            value = {formValues.password}
                            onChange={handleInputChange || ''} required
                        />
                        <EyeBtn onClick={()=>setEyeClicked(!eyeClicked)}>
                            {eyeClicked ?
                                <AiOutlineEyeInvisible                                 
                                    style={iconStyles} 
                                    // eslint-disable-next-line
                                    onMouseOver={({target})=>(target.style.color='#FF7F50', target.style.transitions ='0.3s ease')}
                                    // eslint-disable-next-line
                                    onMouseOut={({target})=>(target.style.color='#828da0', target.style.transitions ='0.3s ease')} 
                                />
                                :
                                <AiOutlineEye                              
                                    style={iconStyles} 
                                    // eslint-disable-next-line
                                    onMouseOver={({target})=>(target.style.color='#FF7F50', target.style.transitions ='0.3s ease')} 
                                    // eslint-disable-next-line
                                    onMouseOut={({target})=>(target.style.color='#828da0', target.style.transitions ='0.3s ease')} 
                                />
                            }
                        </EyeBtn>
                    </Field>
                    <ForgotLink>
                        <ForgotLinkElement onClick={handleOpenForgotPassword}>
                            Esqueceu a senha?
                        </ForgotLinkElement>
                    </ForgotLink>
                    <SubmitButton type="submit" value="LOGIN"></SubmitButton>
                </form> 
            </Box>
        </Container>

        <Snackbar anchorOrigin={{ vertical, horizontal }} open={alertSuccess} autoHideDuration={6000} onClose={handleCloseAlert}>
            <Alert onClose={handleCloseAlert} severity="info" sx={{ width: '100%' }}>
                {messageSuccess}
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

        <Dialog open={changePassword} onClose={handleCloseChangePassword}>
            <DialogTitle>Alteração de senha</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Você está utilizando uma senha provisória e é necessário fazer a alteração.
                </DialogContentText>
                <TextField
                    autoFocus
                    margin="dense"
                    id="new-password"
                    label="Nova senha"
                    type="password"
                    color="warning"
                    fullWidth
                    variant="standard"
                    onChange={handleNewPassword || ''}
                />
                <TextField
                    margin="dense"
                    id="new-password-repeated"
                    label="Nova senha repetida"
                    type="password"
                    color="warning"
                    fullWidth
                    variant="standard"
                    onChange={handleNewPasswordRepeated || ''}
                />
            </DialogContent>
            <DialogActions>
                <Button color="inherit" variant="outlined" onClick={handleCloseChangePassword}>Cancelar</Button>
                <Button color="warning" variant="contained" onClick={handleSubmitChangePassword}>Confirmar</Button>
            </DialogActions>
        </Dialog>

        <Dialog open={forgotPassword} onClose={handleCloseForgotPassword}>
            <DialogTitle>Recuperação de senha</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Informe seu e-mail e uma mensagem será enviada a ele contendo sua nova senha provisória.
                </DialogContentText>
                <TextField
                    autoFocus
                    margin="dense"
                    id="recovery-password"
                    label="E-mail"
                    type="text"
                    color="warning"
                    fullWidth
                    variant="standard"
                    onChange={handleEmailToRecoverPassword || ''}
                />
            </DialogContent>
            <DialogActions>
                <Button color="inherit" variant="outlined" onClick={handleCloseForgotPassword}>Cancelar</Button>
                <Button color="warning" variant="contained" onClick={handleSubmitForgotPassword}>Confirmar</Button>
            </DialogActions>
        </Dialog>
        </>  
    )
}

export default Login;