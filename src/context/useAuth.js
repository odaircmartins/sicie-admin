import { useState, useEffect } from 'react';

import api from '../config/api';
import history from '../config/history';

const useAuth = () => {
    const [authenticated, setAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true);
    const tokenLogin = process.env.REACT_APP_TOKEN_LOGIN;

    useEffect(() => {
        const token = localStorage.getItem('token');

        if(token){
            api.defaults.headers.Authorization = `Bearer ${JSON.parse(token)}`;
            setAuthenticated(true);
        }

        setLoading(false);
    },[]);

    const handleLogin = async (formValues) => {        
        api.defaults.headers.Authorization = `Bearer ${tokenLogin}`;

        let resultado = api.post( '/login', formValues)
            .then(response => {
                if(response.status === 200) {
                    localStorage.setItem('token', JSON.stringify(response.data.token));
                    localStorage.setItem('email', JSON.stringify(formValues.email));
                    api.defaults.headers.Authorization = `Bearer ${response.data.token}`;
            
                    setAuthenticated(true);
            
                    history.push('/painel');                    
                }
            })
            .catch(error => {

                if (error["response"] === undefined){
                    return "O servidor de dados está temporariamente indisponível. Tente mais tarde.";
                }

                if (error.response["data"] === undefined){
                    return "O servidor de dados está temporariamente indisponível. Tente mais tarde.";
                }

                return error.response.data.message;
            });

        return await resultado;
    };

    const handleChangeTemporaryPassword = async (formValues) => {
        
        api.defaults.headers.Authorization = `Bearer ${tokenLogin}`;

        let resultado = api.post( '/change-temporary-password', formValues)
            .then(response => {
                if(response.status === 200) {
                    localStorage.setItem('token', JSON.stringify(response.data.token));
                    api.defaults.headers.Authorization = `Bearer ${response.data.token}`;
                    return 'Sucesso';
                }
            })
            .catch(error => {
                return error.response.data.message;
            });

        return await resultado;
    };

    const handleForgotPassword = async (formValues) => {
        
        api.defaults.headers.Authorization = `Bearer ${tokenLogin}`;

        let resultado = api.post( '/recovery-password', formValues)
            .then(response => {
                if(response.status === 200) {                    
                    //localStorage.setItem('token', JSON.stringify(response.data.token));
                    //api.defaults.headers.Authorization = `Bearer ${response.data.token}`;
                    return 'Sucesso';
                }
            })
            .catch(error => {
                return 'E-mail não encontrado na base de dados';
                //return error.response.data.message;
            });

        return await resultado;
    };

    const handleLogout = async () => {
        setAuthenticated(false);
        localStorage.removeItem('token');
        localStorage.removeItem('email');
        api.defaults.headers.Authorization = undefined;
        history.push('/login');
    };

    return { 
        authenticated, 
        loading, 
        tokenLogin, 
        handleLogin, 
        handleChangeTemporaryPassword, 
        handleForgotPassword,
        handleLogout };
}

export default useAuth;