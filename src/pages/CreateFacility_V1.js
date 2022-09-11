// Third Party Settings
import { useState, useContext, useEffect } from "react";
import { styled as muiStyled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';

// Own Settings
import { Context } from "../context/authContext";
import history from "../config/history";
import api from "../config/api";
import AlertError from "../uiComponents/AlertError";
import AlertSuccess from "../uiComponents/AlertSuccess";
import Loading from "../uiComponents/Loading";
import ButtonMuiStyled from "../uiComponents/ButtonMuiStyled";
import TextFieldMuiStyled from "../uiComponents/TextFieldMuiStyled";
import SwitchMuiStyled from "../uiComponents/SwitchMuiStyled";
import DatePickerMuiStyled from "../uiComponents/DatePickerMuiStyled";
import { cpfMask, removeMask } from "../uiComponents/MasksAndValidations";
import Title from '../uiComponents/Title';
import Area from '../uiComponents/Area';

//Requires
const cpfValidation = require('validar-cpf');

//Styles
const ContainerStyled = muiStyled(Container)({
    marginBottom: '25px'
});

//Component
const Facility = () => {
    //Functions
    const dateToTimestamp = (date) => {
        return Date.parse(date);
    };
    
    const prepareFormToSubmit = () => {
        let formValuesPreparedToSubmit = {...formValues};
        let cpf = removeMask(formValuesPreparedToSubmit.cpf);
        formValuesPreparedToSubmit.cpf = cpf;

        return formValuesPreparedToSubmit;
    };

    const performUpdate = (formPrepared) => {
        api.put('/facilities', formPrepared)
        .then(response => {
            if (response.status === 200) {
                setOpenLoading(false);
                handleResetForm();
                history.push('/servicos');
            }
        })
        .catch(error => {
            setOpenLoading(false);
            handleShowAlertError();
            setMessageError(error.response.data.message);
        });
    };

    const performInsert = (formPrepared) => {
        api.post('/facilities', formPrepared)
            .then(response => {
                if (response.status === 201) {
                    setOpenLoading(false);
                    handleResetForm();
                    handleShowAlertSuccess();
                    history.push('/servicos');
                }
            })
            .catch(error => {
                setOpenLoading(false);
                handleShowAlertError();
                setMessageError(error.response.data.message);
            });
    };

    //Models
    const formModel = {
        name: '',
        validFrom: dateToTimestamp(new Date()),
        validUntil: dateToTimestamp(new Date()),
        cpf: '',
        company: '',
        reason: '',
        barcode: '',
        isActive: true
    }

    //Contexts
    const { setOpenAlertError, setOpenAlertSuccess, setOpenLoading } = useContext(Context);
    const { facilityAction, facilityDataTransport } = useContext(Context);

    //States
    const [formValues, setFormValues] = useState(formModel);
    const [cpfCondition, setCpfCondition] = useState('');
    const [messageError, setMessageError] = useState('erro');

    //Load initial data
    useEffect(() => {
        if (facilityDataTransport !== '') {
            setFormValues(facilityDataTransport);
        }
    }, [facilityDataTransport]);
   
    //Handles
    const handleIsActive = (e) => {
        setFormValues({ ...formValues, 'isActive': e.target.checked });
    };

    const handleInputChange = (e) => {
        //Desestrutura o dado em 'name' e o valor do campo em uso
        const { name, value } = e.target;

        // Faz uma cópia do estado 'formValues' e substitui o
        //'value' conforme o '[name]' do campo em uso
        setFormValues({ ...formValues, [name]: value });    
    };

    const handlechangeCpf = (e) => {
        const cpf = e.target.value;
        const cpfIsValid = cpfValidation(cpf);
        
        setFormValues({ ...formValues, 'cpf': cpf });
        
        if (!cpf || !cpfIsValid) {
            setCpfCondition("CPF inválido");
        } else {
            setCpfCondition("");
        }
    };

    const handleValidFrom = (e) => {
        const timestamp = dateToTimestamp(e);
        setFormValues({ ...formValues, 'validFrom': timestamp });
    };

    const handleValidUntil = (e) => {
        const timestamp = dateToTimestamp(e);
        setFormValues({ ...formValues, 'validUntil': timestamp });
    };

    const handleShowAlertSuccess = () => {
        setOpenAlertSuccess(true);
    };

    const handleShowAlertError = () => {
        setOpenAlertError(true);
    };

    const handleResetForm = () => {
        setFormValues({
            name: '',
            validFrom: dateToTimestamp(new Date()),
            validUntil: dateToTimestamp(new Date()),
            cpf: '',
            company: '',
            reason: '',
            barcode: '',
            isActive: true
        })
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setOpenLoading(true);
        
        let formPrepared = prepareFormToSubmit();

        if(formValues.validFrom > formValues.validUntil){
            setOpenLoading(false);
            handleShowAlertError();
            setMessageError("Término do período não pode ser anterior ao seu início");
            return;
        } 

        if(cpfCondition !== ""){
            setOpenLoading(false);
            handleShowAlertError();
            setMessageError("Revise o CPF informado");
            return;
        } 

        if (facilityAction === "Editar Prestador de Serviço") {
            performUpdate(formPrepared);
        } else {
            delete formPrepared._id;
            performInsert(formPrepared);
        }
    };

    return (
        <>
            <Title subtitle="Prestadores de Serviço" title={facilityAction} />

            <Area>
                <ContainerStyled>
                    <form onSubmit={handleSubmit}>
                        <Grid container spacing={2} alignItems="flex-start" direction="row">
                            <Grid item xs={8}>
                                <TextFieldMuiStyled id="outlined-basic" label="Nome" value={formValues.name} name="name" onChange={handleInputChange || ''} required />
                            </Grid>

                            <Grid item xs={4}>
                                <TextFieldMuiStyled id="outlined-basic" label="CPF" value={cpfMask(formValues.cpf)} name="cpf" helperText={cpfCondition} onChange={handlechangeCpf || ''} required />
                            </Grid>

                            <Grid item xs={6}>
                                <TextFieldMuiStyled id="outlined-basic" label="Empresa" value={formValues.company} name="company" onChange={handleInputChange || ''} required />
                            </Grid>

                            <Grid item xs={3}>
                                <DatePickerMuiStyled label="Início" value={formValues.validFrom} onChange={handleValidFrom || ''} required />
                            </Grid>

                            <Grid item xs={3}>
                                <DatePickerMuiStyled label="Término" value={formValues.validUntil} onChange={handleValidUntil || ''} required />
                            </Grid>

                            <Grid item xs={12}>
                                <TextFieldMuiStyled id="outlined-basic" label="Motivo" value={formValues.reason} name="reason" onChange={handleInputChange || ''} required />
                            </Grid>

                            <Grid item xs={7} >
                            </Grid>
 
                            <Grid item xs={2} >
                                <SwitchMuiStyled name="isActive" label="Ativo" checked={formValues.isActive} onChange={handleIsActive || false} />
                            </Grid>

                            <Grid item xs={3} >
                                <ButtonMuiStyled type="submit" variant="outlined">Confirmar</ButtonMuiStyled>
                            </Grid>                             
                        </Grid>
                    </form>

                    <Loading />
                    <AlertError message={messageError} />
                    <AlertSuccess message="Tarefa executada com sucesso" />
                </ContainerStyled>
            </Area>
        </>
    )
}

export default Facility;