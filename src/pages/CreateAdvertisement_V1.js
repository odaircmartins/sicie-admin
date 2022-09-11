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
import SelectMuiStyled from "../uiComponents/SelectMuiStyled";
import DatePickerMuiStyled from "../uiComponents/DatePickerMuiStyled";
import AdvertisementUpload from "../uiComponents/AdvertisementUpload";
import Title from '../uiComponents/Title';
import Area from '../uiComponents/Area';

//Styles
const ContainerStyled = muiStyled(Container)({
    marginBottom: '25px'
});

//Component
const Advertisement = () => {

    //Functions
    const dateToTimestamp = (date) => {
        return Date.parse(date);
    };

    const prepareFormToSubmit = () => {
        //Create a copy of main State
        let formValuesPreparedToSubmit = { ...formValues };

        return formValuesPreparedToSubmit;
    };

    const performUpdate = (formPrepared) => {
        api.put('/advertisements', formPrepared)
            .then(response => {
                if (response.status === 200) {
                    setOpenLoading(false);
                    handleResetForm();
                    history.push('/anunciantes');
                }
            })
            .catch(error => {
                setOpenLoading(false);
                handleShowAlertError();
                setMessageError(error.response.data.message);
            });
    };

    const performInsert = (formPrepared) => {
        api.post('/advertisements', formPrepared)
            .then(response => {
                if (response.status === 201) {
                    setOpenLoading(false);
                    handleResetForm();
                    handleShowAlertSuccess();
                    history.push('/anunciantes');
                }
            })
            .catch(error => {
                setOpenLoading(false);
                handleShowAlertError();
                setMessageError(error.response.data.message);
            });
    };

    //Models
    const typesModel = ["Ranking"];
    const formModel = {
        company: '',
        type: '',
        banner: '',
        validUntil: dateToTimestamp(new Date()),
        isActive: true
    }

    //Contexts
    const { setOpenAlertError, setOpenAlertSuccess, setOpenLoading } = useContext(Context);
    const { advertisementAction, advertisementDataTransport } = useContext(Context);

    //States
    const [formValues, setFormValues] = useState(formModel);
    const [messageError, setMessageError] = useState('erro');

    //Load initial data
    useEffect(() => {
        if (advertisementDataTransport !== '') {
            setFormValues(advertisementDataTransport);
        }
    }, [advertisementDataTransport]);

    //Handles
    const handleIsActive = (e) => {
        setFormValues({ ...formValues, 'isActive': e.target.checked });
    };

    const handleInputChange = (e) => {
        //Desestrutura o dado em 'name' e o valor do campo em uso
        const { name, value } = e.target;

        setFormValues({ ...formValues, [name]: value });
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
        setFormValues({
            company: '',
            type: '',
            banner: '',
            validUntil: '',
            isActive: false
        })
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setOpenLoading(true);

        let formPrepared = prepareFormToSubmit();

        if (advertisementAction === "Editar Anunciante") {
            performUpdate(formPrepared);
        } else {
            delete formPrepared._id;
            performInsert(formPrepared);
        }
    };

    return (
        <>
            <Title subtitle="Anunciantes" title={advertisementAction} />

            <Area>
                <ContainerStyled>
                    <form onSubmit={handleSubmit}>

                        <Grid container spacing={2} alignItems="center" direction="row">
                            <Grid item xs={3}>
                                <TextFieldMuiStyled id="outlined-basic" label="Company" value={formValues.company} name="company" onChange={handleInputChange || ''} required />
                            </Grid>

                            <Grid item xs={2}>
                                <SelectMuiStyled name="type" label="Categoria" value={formValues.type} data={typesModel} onChange={handleInputChange || ''} required />
                            </Grid>

                            <Grid item xs={3}>
                                <DatePickerMuiStyled label="Validade" value={formValues.validUntil} onChange={handleValidUntil || ''} required />
                            </Grid>

                            <Grid item xs={2} >
                                <SwitchMuiStyled name="isActive" label="Ativo" checked={formValues.isActive} onChange={handleIsActive || false} />
                            </Grid>

                            <Grid item xs={2} >
                                <ButtonMuiStyled type="submit" variant="outlined">Confirmar</ButtonMuiStyled>
                            </Grid>

                            <Grid item xs={3}>
                                <AdvertisementUpload title="Adicionar Logo" value={formValues.banner} setProps={handleBanner} id="banner" />
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

export default Advertisement;