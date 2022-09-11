import { useState } from 'react';

const useEffect = () => {
    const [ advertisementAction, setAdvertisementAction ] = useState('Criar Anunciante');
    const [ advertisementDataTransport, setAdvertisementDataTransport ] = useState('');

    return {advertisementAction, 
            setAdvertisementAction, 
            advertisementDataTransport, 
            setAdvertisementDataTransport, 
    };
}

export default useEffect;