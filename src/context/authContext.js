import React, { createContext } from 'react';

import useAuth from './useAuth';
import useEvent from './useEvent';
import useFacility from './useFacility';
import useAdvertisement from './useAdvertisement';

const Context = createContext();

const AuthProvider = ({children}) => {
    const { authenticated, 
            loading, 
            tokenLogin, 
            handleLogin, 
            handleChangeTemporaryPassword, 
            handleForgotPassword,
            handleLogout } = useAuth();
            
    const { eventAction, 
            setEventAction, 
            eventDataTransport, 
            setEventDataTransport, 
            openAlertError, 
            setOpenAlertError, 
            openAlertSuccess, 
            setOpenAlertSuccess,
            openLoading, 
            setOpenLoading } = useEvent();

    const { facilityAction, 
            setFacilityAction, 
            facilityDataTransport, 
            setFacilityDataTransport } = useFacility();

    const { advertisementAction, 
            setAdvertisementAction, 
            advertisementDataTransport, 
            setAdvertisementDataTransport } = useAdvertisement();

    return (
        <Context.Provider value={{ 
            authenticated, 
            loading, 
            tokenLogin, 
            handleLogin, 
            handleChangeTemporaryPassword, 
            handleForgotPassword,
            handleLogout,
            eventAction,
            setEventAction,
            eventDataTransport, 
            setEventDataTransport,
            openAlertError, 
            setOpenAlertError, 
            openAlertSuccess, 
            setOpenAlertSuccess,
            openLoading, 
            setOpenLoading,
            facilityAction, 
            setFacilityAction, 
            facilityDataTransport, 
            setFacilityDataTransport,
            advertisementAction, 
            setAdvertisementAction, 
            advertisementDataTransport, 
            setAdvertisementDataTransport
        }}>
            {children}
        </Context.Provider>
    );
};

export { Context, AuthProvider };