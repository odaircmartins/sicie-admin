import React, { createContext } from 'react';

import useAuth from './useAuth';

const Context = createContext();

const AuthProvider = ({children}) => {
    const { authenticated, loading, tokenLogin, handleLogin, handleChangeTemporaryPassword, handleLogout } = useAuth();

    return (
        <Context.Provider value={{ authenticated, loading, tokenLogin, handleLogin, handleChangeTemporaryPassword, handleLogout }}>
            {children}
        </Context.Provider>
    );
};

export { Context, AuthProvider };