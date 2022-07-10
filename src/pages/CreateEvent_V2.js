// Third Party Settings
import { useState, useContext, useEffect } from "react";
import { styled as muiStyled } from '@mui/material/styles';
import { convertToRaw, convertFromRaw, EditorState } from 'draft-js';
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
import SelectMuiStyled from "../uiComponents/SelectMuiStyled";
import DatePickerMuiStyled from "../uiComponents/DatePickerMuiStyled";
import TextCurrencyMuiStyled from "../uiComponents/TextCurrencyMuiStyled";
import TextNumberMuiStyled from "../uiComponents/TextNumberMuiStyled";
import DraftRichTextStyled from "../uiComponents/DraftRichTextStyled";
import ImageUpload from "../uiComponents/ImageUpload";
import Title from '../uiComponents/Title';
import Area from '../uiComponents/Area';

//Styles
const ContainerStyled = muiStyled(Container)({
    marginBottom: '25px'
});

//Component
const Event = () => {
    //Functions
    const dateToTimestamp = (date) => {
        return Date.parse(date);
    };
    
    const currencyToFloat = (currencyValue) => {
        let valueString = currencyValue.toString();
        let valueAdjusted = valueString.replace("R$ ", "");
        valueAdjusted = valueAdjusted.replace(".", "");
        valueAdjusted = valueAdjusted.replace(",", ".");
                
        return parseFloat(valueAdjusted);
    };

    const prepareFormToSubmit = () => {
        //Create a copy of main State
        let formValuesPreparedToSubmit = {...formValues};

        //Convert prices of Currency Mask String to Float Number
        const carParkingPriceFloat = currencyToFloat(formValues.carParkingPrice);
        const motoParkingPriceFloat = currencyToFloat(formValues.motoParkingPrice);
        const eventTicketPrice1Float = currencyToFloat(formValues.eventTicketPrice1);
        const eventTicketPrice2Float = currencyToFloat(formValues.eventTicketPrice2);
        const eventTicketPrice3Float = currencyToFloat(formValues.eventTicketPrice3);
        const eventTicketPrice4Float = currencyToFloat(formValues.eventTicketPrice4);
        const eventTicketPrice5Float = currencyToFloat(formValues.eventTicketPrice5);

        //Convert Rich Text of HTML to JSON RAW format
        const summaryRaw = convertToRaw(richSummaryState.getCurrentContent());
        const summaryJson = JSON.stringify(summaryRaw);

        //Convert installment of String to Number
        const installmentsInteger = parseInt(formValues.installments);

        //Replace new format in the main State
        formValuesPreparedToSubmit.carParkingPrice = carParkingPriceFloat;
        formValuesPreparedToSubmit.motoParkingPrice = motoParkingPriceFloat;
        formValuesPreparedToSubmit.eventTicketPrice1 = eventTicketPrice1Float;
        formValuesPreparedToSubmit.eventTicketPrice2 = eventTicketPrice2Float;
        formValuesPreparedToSubmit.eventTicketPrice3 = eventTicketPrice3Float;
        formValuesPreparedToSubmit.eventTicketPrice4 = eventTicketPrice4Float;
        formValuesPreparedToSubmit.eventTicketPrice5 = eventTicketPrice5Float;
        formValuesPreparedToSubmit.summary = summaryJson;
        formValuesPreparedToSubmit.installments = installmentsInteger;
        
        //Check no required fields about ticket price and delete if didn't used
        if (formValuesPreparedToSubmit.eventTicketType2 === "" || formValuesPreparedToSubmit.eventTicketPrice2 === ""){
            formValuesPreparedToSubmit.eventTicketType2 = "";
            formValuesPreparedToSubmit.eventTicketPrice2 = 0;
        }

        if (formValuesPreparedToSubmit.eventTicketType3 === "" || formValuesPreparedToSubmit.eventTicketPrice3 === ""){
            formValuesPreparedToSubmit.eventTicketType3 = "";
            formValuesPreparedToSubmit.eventTicketPrice3 = 0;
        }

        if (formValuesPreparedToSubmit.eventTicketType4 === "" || formValuesPreparedToSubmit.eventTicketPrice4 === ""){
            formValuesPreparedToSubmit.eventTicketType4 = "";
            formValuesPreparedToSubmit.eventTicketPrice4 = 0;
        }

        if (formValuesPreparedToSubmit.eventTicketType5 === "" || formValuesPreparedToSubmit.eventTicketPrice5 === ""){
            formValuesPreparedToSubmit.eventTicketType5 = "";
            formValuesPreparedToSubmit.eventTicketPrice5 = 0;
        }

        return formValuesPreparedToSubmit;
    };

    const performUpdate = (formPrepared) => {
        api.put('/events', formPrepared)
            .then(response => {
                if (response.status === 200) {
                    setOpenLoading(false);
                    handleResetForm();
                    history.push('/listar-eventos');
                }
            })
            .catch(error => {
                setOpenLoading(false);
                handleShowAlertError();
                setMessageError(error.response.data.message);
            });
    };

    const performInsert = (formPrepared) => {
        api.post('/events', formPrepared)
            .then(response => {
                if (response.status === 201) {
                    setOpenLoading(false);
                    handleResetForm();
                    handleShowAlertSuccess();
                    history.push('/listar-eventos');
                }
            })
            .catch(error => {
                setOpenLoading(false);
                handleShowAlertError();
                setMessageError(error.response.data.message);
            });
    };

    //Models
    const categoriesModel = ["Arrancada", "Autódromo", "Cartódromo"];
    const formModel = {
        synchronized: false,
        validFrom: dateToTimestamp(new Date()),
        validUntil: dateToTimestamp(new Date()),
        name: '',
        category: '',
        summary: '',
        banner: '',
        isActive: true,
        carParkingPrice: '',
        motoParkingPrice: '',
        installments: '',
        eventTicketType1: '',
        eventTicketPrice1: '',
        eventTicketType2: '',
        eventTicketPrice2: '',
        eventTicketType3: '',
        eventTicketPrice3: '',
        eventTicketType4: '',
        eventTicketPrice4: '',
        eventTicketType5: '',
        eventTicketPrice5: '',
        group: ''
    }

    //Contexts
    const { setOpenAlertError, setOpenAlertSuccess, setOpenLoading } = useContext(Context);
    const { eventAction, eventDataTransport } = useContext(Context);

    //States
    const [formValues, setFormValues] = useState(formModel);
    const [messageError, setMessageError] = useState('erro');
    const [richSummaryState, setRichSummaryState] = useState(() => EditorState.createEmpty());

    //Load initial data
    useEffect(() => {
        if (eventDataTransport !== '') {
            setFormValues(eventDataTransport);
            const raw = JSON.parse(eventDataTransport.summary);
            const content = convertFromRaw(raw);            
            setRichSummaryState(() => EditorState.createWithContent(content));
        }
    }, [eventDataTransport]);
   
    //Handles
    const handleIsActive = (e) => {
        setFormValues({ ...formValues, 'isActive': e.target.checked });
    };

    const handleInputChange = (e) => {
        //Desestrutura o dado em 'name' e o valor do campo em uso
        const { name, value } = e.target;

        // Faz uma cópia do estado 'formValues' e substitui o
        //'value' conforme o '[name]' do campo em uso
        if (value === '0'){
            setFormValues({ ...formValues, [name]: 1 });
            return;
        }

        if (value === 'R$ 0,00'){
            setFormValues({ ...formValues, [name]: 'R$ 0,01' });
            return;
        }
    
        setFormValues({ ...formValues, [name]: value });    
    };

    const handleValidFrom = (e) => {
        const timestamp = dateToTimestamp(e);
        setFormValues({ ...formValues, 'validFrom': timestamp });
    };

    const handleValidUntil = (e) => {
        const timestamp = dateToTimestamp(e);
        setFormValues({ ...formValues, 'validUntil': timestamp });
    };

    const handleBanner = (e) => {
        setFormValues({ ...formValues, 'banner': e });
    };

    const handleShowAlertSuccess = () => {
        setOpenAlertSuccess(true);
    };

    const handleShowAlertError = () => {
        setOpenAlertError(true);
    };

    const handleResetForm = () => {
        setRichSummaryState('');

        setFormValues({
            validFrom: '',
            validUntil: '',
            name: '',
            category: '',
            summary: '',
            banner: '',
            isActive: false,
            carParkingPrice: '',
            motoParkingPrice: '',
            installments: '',
            eventTicketType1: '',
            eventTicketPrice1: '',
            eventTicketType2: '',
            eventTicketPrice2: '',
            eventTicketType3: '',
            eventTicketPrice3: '',
            eventTicketType4: '',
            eventTicketPrice4: '',
            eventTicketType5: '',
            eventTicketPrice5: ''
        })
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setOpenLoading(true);
        
        let formPrepared = prepareFormToSubmit();

        if(formValues.validFrom > formValues.validUntil){
            setOpenLoading(false);
            handleShowAlertError();
            setMessageError("Término do evento não pode ser anterior ao seu início");
            return;
        } 

        if (eventAction === "Editar Evento") {
            performUpdate(formPrepared);
        } else {
            delete formPrepared._id;
            performInsert(formPrepared);
        }
    };

    return (
        <>
            <Title subtitle="Eventos" title={eventAction} />

            <Area>
                <ContainerStyled>
                    <form onSubmit={handleSubmit}>
                        <Grid container spacing={2} alignItems="center" direction="row">
                            <Grid item xs={9}>
                                <TextFieldMuiStyled id="outlined-basic" label="Nome" value={formValues.name} name="name" onChange={handleInputChange || ''} required />
                            </Grid>

                            <Grid item xs={3}>
                                <TextFieldMuiStyled id="outlined-basic" label="Grupo" value={formValues.group} name="group" onChange={handleInputChange || ''} required />
                            </Grid>

                            <Grid item xs={6}>
                                <SelectMuiStyled name="category" label="categoria" value={formValues.category} data={categoriesModel} onChange={handleInputChange || ''} required />
                            </Grid>

                            <Grid item xs={3}>
                                <DatePickerMuiStyled label="Início" value={formValues.validFrom} onChange={handleValidFrom || ''} required />
                            </Grid>

                            <Grid item xs={3}>
                                <DatePickerMuiStyled label="Término" value={formValues.validUntil} onChange={handleValidUntil || ''} required />
                            </Grid>

                            <Grid item xs={4}>
                                <TextCurrencyMuiStyled label="Preço do estaciomento Carro" name="carParkingPrice" value={formValues.carParkingPrice} onChange={handleInputChange || ""} required />
                            </Grid>

                            <Grid item xs={4}>
                                <TextCurrencyMuiStyled label="Preço do estaciomento Moto" name="motoParkingPrice" value={formValues.motoParkingPrice} onChange={handleInputChange || ""} required />
                            </Grid>

                            <Grid item xs={4}>
                                <TextNumberMuiStyled label="Nº máximo de parcelas" value={formValues.installments} name="installments" onChange={handleInputChange || ''} required />
                            </Grid>

                            <Grid item xs={8}>
                                <TextFieldMuiStyled id="outlined-basic" label="Descrição do Ingresso 1" value={formValues.eventTicketType1} name="eventTicketType1" onChange={handleInputChange || ''} required />
                            </Grid>

                            <Grid item xs={4}>
                                <TextCurrencyMuiStyled label="Preço do Ingresso 1" name="eventTicketPrice1" value={formValues.eventTicketPrice1} onChange={handleInputChange || ""} required />
                            </Grid>

                            <Grid item xs={8}>
                                <TextFieldMuiStyled id="outlined-basic" label="Descrição do Ingresso 2" value={formValues.eventTicketType2} name="eventTicketType2" onChange={handleInputChange || ''} />
                            </Grid>

                            <Grid item xs={4}>
                                <TextCurrencyMuiStyled label="Preço do Ingresso 2" value={formValues.eventTicketPrice2} name="eventTicketPrice2" onChange={handleInputChange || ""} />
                            </Grid>

                            <Grid item xs={8}>
                                <TextFieldMuiStyled id="outlined-basic" label="Descrição do Ingresso 3" value={formValues.eventTicketType3} name="eventTicketType3" onChange={handleInputChange || ''} />
                            </Grid>

                            <Grid item xs={4}>
                                <TextCurrencyMuiStyled label="Preço do Ingresso 3" value={formValues.eventTicketPrice3} name="eventTicketPrice3" onChange={handleInputChange || ""} />
                            </Grid>

                            <Grid item xs={8}>
                                <TextFieldMuiStyled id="outlined-basic" label="Descrição do Ingresso 4" value={formValues.eventTicketType4} name="eventTicketType4" onChange={handleInputChange || ''} />
                            </Grid>

                            <Grid item xs={4}>
                                <TextCurrencyMuiStyled label="Preço do Ingresso 4" name="eventTicketPrice4" value={formValues.eventTicketPrice4} onChange={handleInputChange || ""} />
                            </Grid>

                            <Grid item xs={8}>
                                <TextFieldMuiStyled id="outlined-basic" label="Descrição do Ingresso 5" value={formValues.eventTicketType5} name="eventTicketType5" onChange={handleInputChange || ''} />
                            </Grid>

                            <Grid item xs={4}>
                                <TextCurrencyMuiStyled label="Preço do Ingresso 5" name="eventTicketPrice5" value={formValues.eventTicketPrice5} onChange={handleInputChange || ""} />
                            </Grid>

                            <Grid item xs={12}>
                                <ImageUpload title="Adicionar Banner" value={formValues.banner} setProps={handleBanner} id="banner" />
                            </Grid>

                            <Grid item xs={12}>
                                <DraftRichTextStyled 
                                    editorState={richSummaryState} 
                                    onEditorStateChange={setRichSummaryState} 
                                />
                            </Grid>

                            <Grid item xs={7} >
                            </Grid>

                            <Grid item xs={2} >
                                <SwitchMuiStyled name="isActive" checked={formValues.isActive} onChange={handleIsActive || false} />
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

export default Event;