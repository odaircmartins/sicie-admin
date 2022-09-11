import { useState } from 'react';

const useEffect = () => {
    const [ facilityAction, setFacilityAction ] = useState('Novo Prestador de Serviço');
    const [ facilityDataTransport, setFacilityDataTransport ] = useState('');

    return {facilityAction, 
            setFacilityAction, 
            facilityDataTransport, 
            setFacilityDataTransport};
}

export default useEffect;