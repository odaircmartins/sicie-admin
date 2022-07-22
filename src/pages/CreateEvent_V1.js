// Third Party Settings
import { useState, useContext, useEffect } from "react";
import { styled } from '@mui/material/styles';
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
import ImageUpload from "../uiComponents/ImageUpload";
import Title from '../uiComponents/Title';
import Area from '../uiComponents/Area';

//Styles
const ContainerStyled = styled(Container)({
    marginBottom: '25px'
})

//Component
const Event = () => {
    //States
    const { setOpenAlertError, setOpenAlertSuccess, setOpenLoading } = useContext(Context);
    const { eventAction, eventDataTransport } = useContext(Context);
    const [banner, setBanner] = useState('');
    const [image0, setImage0] = useState('');
    const [image1, setImage1] = useState('');
    const [image2, setImage2] = useState('');
    const [categories, setCategories] = useState(["Arrancada", "Autódromo", "Kartódromo"]);
    const [valueValidFrom, setValueValidFrom] = useState(null);
    const [valueValidUntil, setValueValidUntil] = useState(null);
    const [category, setCategory] = useState('');
    const [messageError, setMessageError] = useState('erro');
    const [formValues, setFormValues] = useState({
        validFrom: '',
        validUntil: '',
        name: '',
        category: '',
        summary: '',
        banner: '',
        images: ['', '', ''],
        isActive: false,
        eventTicket: '',
        carParkingTicket: '',
        motoParkingTicket: '',
        installments: ''
    });


    //Load initial data
    useEffect(() => {
        if (eventDataTransport !== '') {

            setFormValues(eventDataTransport);
            setCategory(eventDataTransport.category);

            let dateValidFrom = eventDataTransport.validFrom;
            let dateValidFromArray = dateValidFrom.split("/");

            let diaFrom = parseInt(dateValidFromArray[0]);
            let mesFrom = parseInt(dateValidFromArray[1])  - 1 ;
            let anoFrom = parseInt(dateValidFromArray[2]) + 2000;

            let dateFromAdjusted = new Date(anoFrom,mesFrom,diaFrom);
            setValueValidFrom(dateFromAdjusted);

            let dateValidUntil = eventDataTransport.validUntil;
            let dateValidUntilArray = dateValidUntil.split("/");

            let diaUntil = parseInt(dateValidUntilArray[0]);
            let mesUntil = parseInt(dateValidUntilArray[1])  - 1 ;
            let anoUntil = parseInt(dateValidUntilArray[2]) + 2000;

            let dateUntilAdjusted = new Date(anoUntil,mesUntil,diaUntil);
            setValueValidUntil(dateUntilAdjusted);

            setBanner(eventDataTransport.banner);
            setImage0(eventDataTransport.images[0]);
            setImage1(eventDataTransport.images[1]);
            setImage2(eventDataTransport.images[2]);

            console.log(eventDataTransport);
        }
    }, []);

    //Handles
    const handlePrices = (prop) => (event) => {
        setFormValues({ ...formValues, [prop]: event.target.value });
    };

    const handleCategory = (event) => {
        setCategory(event.target.value);
        setFormValues({ ...formValues, 'category': event.target.value });
    };

    const handleValidFrom = (newValue) => {
        setValueValidFrom(newValue);
        const timestampDate = Date.parse(newValue);
        setFormValues({ ...formValues, 'validFrom': timestampDate });
        console.log(newValue);
    };

    const handleValidUntil = (newValue) => {
        setValueValidUntil(newValue);
        const timestampDate = Date.parse(newValue);
        setFormValues({ ...formValues, 'validUntil': timestampDate });
        console.log(newValue);
    };

    const handleShowAlertSuccess = () => {
        setOpenAlertSuccess(true);
    };

    const handleShowAlertError = () => {
        setOpenAlertError(true);
    };

    const handleSwitchChange = (event) => {
        setFormValues({ ...formValues, 'isActive': event.target.checked });
    };

    const handleResetForm = () => {
        setValueValidFrom(null);
        setValueValidUntil(null);
        setCategory('');
        setFormValues({
            validFrom: '',
            validUntil: '',
            name: '',
            category: '',
            summary: '',
            banner: '',
            images: ['', '', ''],
            isActive: false,
            eventTicket: '',
            carParkingTicket: '',
            motoParkingTicket: '',
            installments: ''
        })
    }

    const handleInputChange = (e) => {
        //Desestrutura o dado em 'name' e o valor do campo em uso
        const { name, value } = e.target;

        // Faz uma cópia do estado 'formValues' e substitui o
        //'value' conforme o '[name]' do campo em uso
        setFormValues({ ...formValues, [name]: value });

        console.log(formValues);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setOpenLoading(true);

        if (formValues.validFrom > formValues.validUntil) {
            setOpenLoading(false);
            handleShowAlertError();
            setMessageError("Término do evento não pode ser anterior ao seu início");
            return
        }

        if (eventAction === "Editar Evento") {

            formValues.validFrom = Date.parse(valueValidFrom);
            formValues.validUntil = Date.parse(valueValidUntil);

            let eventTicket = formValues.eventTicket.toString();
            let eventTicketAdjusted = eventTicket.replace("R$ ", "");
            eventTicketAdjusted = eventTicketAdjusted.replace(",", ".");
            formValues.eventTicket = eventTicketAdjusted;

            let carParkingTicket = formValues.carParkingTicket.toString();
            let carParkingTicketAdjusted = carParkingTicket.replace("R$ ", "");
            carParkingTicketAdjusted= carParkingTicketAdjusted.replace(",", ".");
            formValues.carParkingTicket = carParkingTicketAdjusted;

            let motoParkingTicket = formValues.motoParkingTicket.toString();
            let motoParkingTicketAdjusted = motoParkingTicket.replace("R$ ", "");
            motoParkingTicketAdjusted= motoParkingTicketAdjusted.replace(",", ".");
            formValues.motoParkingTicket = motoParkingTicketAdjusted;

            formValues.banner = banner;
            formValues.images[0] = image0;
            formValues.images[1] = image1;
            formValues.images[2] = image2;

            api.put('/events', formValues)
                .then(response => {
                    if (response.status === 200) {
                        setOpenLoading(false);
                        handleResetForm();
                        history.push('/listar-eventos');
                        //console.log(response.data);
                    }
                })
                .catch(error => {
                    setOpenLoading(false);
                    handleShowAlertError();
                    setMessageError(error.response.data.message);
                    // if( error.response ){
                    //     console.log(error.response.data); // => the response payload
                    // }
                });
        } else {
            formValues.validFrom = Date.parse(valueValidFrom);
            formValues.validUntil = Date.parse(valueValidUntil);

            
            let eventTicket = formValues.eventTicket.toString();
            let eventTicketAdjusted = eventTicket.replace("R$ ", "");
            eventTicketAdjusted = eventTicketAdjusted.replace(",", ".");
            formValues.eventTicket = eventTicketAdjusted;

            let carParkingTicket = formValues.carParkingTicket.toString();
            let carParkingTicketAdjusted = carParkingTicket.replace("R$ ", "");
            carParkingTicketAdjusted= carParkingTicketAdjusted.replace(",", ".");
            formValues.carParkingTicket = carParkingTicketAdjusted;

            let motoParkingTicket = formValues.motoParkingTicket.toString();
            let motoParkingTicketAdjusted = motoParkingTicket.replace("R$ ", "");
            motoParkingTicketAdjusted= motoParkingTicketAdjusted.replace(",", ".");
            formValues.motoParkingTicket = motoParkingTicketAdjusted;

            formValues.banner = banner;
            formValues.images[0] = image0;
            formValues.images[1] = image1;
            formValues.images[2] = image2;

            delete formValues._id;

            console.log(formValues);

            api.post('/events', formValues)
                .then(response => {
                    if (response.status === 201) {
                        setOpenLoading(false);
                        handleResetForm();
                        handleShowAlertSuccess();
                        history.push('/listar-eventos');
                        //console.log(response.data);
                    }
                })
                .catch(error => {
                    setOpenLoading(false);
                    handleShowAlertError();
                    setMessageError(error.response.data.message);
                    // if( error.response ){
                    //     console.log(error.response.data); // => the response payload
                    // }
                });
        }
    }

    return (
        <>
        <Title subtitle="Eventos" title={eventAction} />

        <Area>
            <ContainerStyled>
                <form onSubmit={handleSubmit}>
                    <Grid container spacing={2} alignItems="center" direction="row">
                        <Grid item xs={9} >
                            <SwitchMuiStyled checked={formValues.isActive} onChange={handleSwitchChange || false} />
                        </Grid>

                        <Grid item xs={3} >
                            <ButtonMuiStyled type="submit" variant="outlined">Confirmar</ButtonMuiStyled>
                        </Grid>

                        <Grid item xs={12}>
                            <TextFieldMuiStyled id="outlined-basic" label="Nome" value={formValues.name} name="name" onChange={handleInputChange || ''} required />
                        </Grid>

                        <Grid item xs={6}>
                            <SelectMuiStyled value={category} data={categories} onChange={handleCategory} required />
                        </Grid>

                        <Grid item xs={3}>
                            <DatePickerMuiStyled label="Início" value={valueValidFrom} onChange={(newValue) => handleValidFrom(newValue)} required />
                        </Grid>

                        <Grid item xs={3}>
                            <DatePickerMuiStyled label="Término" value={valueValidUntil} onChange={(newValue) => handleValidUntil(newValue)} required />
                        </Grid>

                        <Grid item xs={3}>
                            <TextCurrencyMuiStyled label="Valor Evento" value={formValues.eventTicket} onChange={handlePrices('eventTicket')} required />
                        </Grid>

                        <Grid item xs={3}>
                            <TextCurrencyMuiStyled label="Valor Carro" value={formValues.carParkingTicket} onChange={handlePrices('carParkingTicket')} required />
                        </Grid>

                        <Grid item xs={3}>
                            <TextCurrencyMuiStyled label="Valor Moto" value={formValues.motoParkingTicket} onChange={handlePrices('motoParkingTicket')} required />
                        </Grid>

                        <Grid item xs={3}>
                            <TextNumberMuiStyled label="Parcelas" value={formValues.installments} name="installments" onChange={handleInputChange || ''} required />
                        </Grid>

                        <Grid item xs={6}>
                            <TextFieldMuiStyled id="outlined-multiline-flexible" label="Resumo" multiline rows={2} value={formValues.summary} name="summary" onChange={handleInputChange || ''} required />
                        </Grid>

                        <Grid item xs={6}>
                            <ImageUpload title="Adicionar Banner" value={banner} setProps={setBanner} id="banner" />
                        </Grid>

                        <Grid item xs={4}>
                            <ImageUpload title="Adicionar Imagem 1" value={image0} setProps={setImage0} id="image0" />
                        </Grid>

                        <Grid item xs={4}>
                            <ImageUpload title="Adicionar Imagem 2" value={image1} setProps={setImage1} id="image1" />
                        </Grid>

                        <Grid item xs={4}>
                            <ImageUpload title="Adicionar Imagem 3" value={image2} setProps={setImage2} id="image2" />
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