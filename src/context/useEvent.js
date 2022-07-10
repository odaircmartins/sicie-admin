import { useState } from 'react';

const useEffect = () => {
    const [ eventAction, setEventAction ] = useState('Criar Evento');
    const [ eventDataTransport, setEventDataTransport ] = useState('');
    const [ openAlertError, setOpenAlertError ] = useState(false);
    const [ openAlertSuccess, setOpenAlertSuccess ] = useState(false);
    const [ openLoading, setOpenLoading ] = useState(false);

    return {eventAction, 
            setEventAction, 
            eventDataTransport, 
            setEventDataTransport, 
            openAlertError, 
            setOpenAlertError, 
            openAlertSuccess, 
            setOpenAlertSuccess,
            openLoading, 
            setOpenLoading};
}

export default useEffect;