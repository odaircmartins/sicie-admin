// Third Party Settings
import React, { useState, useEffect, useContext, forwardRef } from "react";
import MaterialTable from '@material-table/core';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import Title from '../uiComponents/Title';
import Area from '../uiComponents/Area';
import { ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles';
import { createTheme } from '@material-ui/core/styles';
import { Context } from "../context/authContext";
import api from '../config/api';
import history from "../config/history";

//Component
const ListAdvertisements = () => {
    //States
    const [alertSuccess, setAlertSuccess] = useState(false);
    const [alertError, setAlertError] = useState(false);
    const [messageSuccess, setMessageSuccess] = useState('sucesso');
    const [messageError, setMessageError] = useState('erro');
    const [loading, setLoading] = useState(false);
    const [advertisements, setAdvertisements] = useState([]);

    const { setAdvertisementAction } = useContext(Context);
    const { setAdvertisementDataTransport } = useContext(Context);

    //Load initial data
    useEffect(() => {
        (async () => {
            const { data } = await api.get('/advertisements');
            const dataFormated = data.map((register) => {
                return {
                    _id: register._id,
                    company: register.company,
                    banner: register.banner,
                    type: register.type,
                    isActive: register.isActive,
                    validUntil: register.validUntil,
                    validUntilDate: new Intl.DateTimeFormat('pt-BR', { year: '2-digit', month: '2-digit', day: '2-digit' }).format(register.validUntil),
                }
            })

            setAdvertisementDataTransport('');
            setAdvertisements(dataFormated);
        })();
    }, [setAdvertisementDataTransport]);

    //Handles
    const handleShowAlertSuccess = () => {
        setAlertSuccess(true);
    };

    const handleShowAlertError = () => {
        setAlertError(true);
    };

    const handleCloseAlert = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setAlertSuccess(false);
        setAlertError(false);
    };

    const handleInactive = (newData) => {
        setLoading(true);

        api.delete('/advertisements/' + newData._id)
            .then(response => {
                if (response.status === 200) {
                    const dataUpdate = [...advertisements];
                    const index = newData.tableData.id;
                    newData.isActive = false;
                    dataUpdate[index] = newData;
                    setAdvertisements([...dataUpdate]);
                    setMessageSuccess('Anunciante inativado');
                    setLoading(false);
                    handleShowAlertSuccess();
                }
            })
            .catch(error => {
                setLoading(false);
                handleShowAlertError();
                setMessageError(error.response.data.message);
                if (error.response) {
                    console.log(error.response.data);
                }
            });
    }

    //Others
    const vertical = 'bottom';
    const horizontal = 'right';

    const Alert = forwardRef(function Alert(props, ref) {
        return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
    });

    const theme = createTheme({
        palette: {
            primary: {
                main: '#fb9678'
            },
            secondary: {
                main: '#ef6c00',
            }
        }
    });

    return (
        <>
        <Title subtitle="Anunciantes" title="Lista de Anunciantes" />

        <Area>
            <MuiThemeProvider theme={theme}>
                <MaterialTable
                    style={{ boxShadow: 'none', fontSize: '14px' }}
                    title=""
                    columns={[
                        {
                            title: 'Empresa',
                            field: 'company',
                            editable: 'always'
                        },
                        {
                            title: 'Tipo',
                            field: 'type',
                            editable: 'always'
                        },
                        {
                            title: 'Fim',
                            field: 'validUntilDate',
                            type: 'date',
                            align: 'center',
                            cellStyle: { textAlign: "center" },
                            editable: 'always',
                            dateSetting: { format: 'dd/MM/yy' },
                            tooltip: 'Validade do anúncio'
                        },
                        {
                            title: 'Ativo',
                            field: 'isActive',
                            type: 'boolean',
                            editable: 'always'
                        }
                    ]}
                    data={advertisements}
                    actions={[
                        {
                            icon: 'add_circle',
                            tooltip: 'Novo',
                            isFreeAction: true,
                            onClick: (event) => {
                                setAdvertisementAction('Novo Anunciante');
                                history.push('/criar-anunciante');
                            }
                        },
                        rowData => ({
                            icon: 'edit',
                            tooltip: 'Editar',
                            onClick: (event, rowData) => {
                                setAdvertisementAction('Editar Anunciante');
                                setAdvertisementDataTransport(rowData);
                                history.push('/criar-anunciante');
                            }
                        }),
                        rowData => ({
                            icon: 'library_add',
                            tooltip: 'Copiar',
                            onClick: (event, rowData) => {
                                setAdvertisementAction('Novo Anunciante');
                                setAdvertisementDataTransport(rowData);
                                history.push('/criar-anunciante')
                            }
                        }),
                        rowData => ({
                            icon: 'do_disturb_icon',
                            tooltip: 'Tornar inativo',
                            disabled: !rowData.isActive,
                            onClick: (event, rowData) => {
                                handleInactive(rowData)
                            }
                        })
                    ]}
                    options={{
                        actionsColumnIndex: -1,
                        columnsButton: true,
                        paging: true,
                        search: true,
                        tableLayout: "auto",
                        headerStyle: {
                            color: '#ef6c00'
                        }
                    }}
                    localization={{
                        pagination: {
                            labelDisplayedRows: '{from}-{to} de {count}',
                            labelRowsSelect: 'linhas',
                            firstAriaLabel: 'Primeira página',
                            firstTooltip: 'Primeira página',
                            previousAriaLabel: 'Página anterior',
                            previousTooltip: 'Página anterior',
                            nextAriaLabel: 'Próxima página',
                            nextTooltip: 'Próxima página',
                            lastAriaLabel: 'Última página',
                            lastTooltip: 'Última página'
                        },
                        toolbar: {
                            nRowsSelected: '{0} linhas(s) selecionandas',
                            searchPlaceholder: "Filtrar",
                            searchTooltip: 'Filtrar',
                            showColumnsTitle: 'Mostrar colunas',
                            showColumnsAriaLabe: 'Mostrar colunas',
                            addRemoveColumns: 'Adicionar ou remover colunas'
                        },
                        header: {
                            actions: 'Ações'
                        },
                        body: {
                            emptyDataSourceMessage: 'Sem dados para exibir',
                            deleteTooltip: 'Excluir',
                            editTooltip: 'Alterar',
                            addTooltip: 'Adicionar',
                            editRow: {
                                deleteText: 'Tem certeza que deseja excluir?',
                                cancelTooltip: 'Cancelar',
                                saveTooltip: 'Confirmar'
                            },
                            filterRow: {
                                filterTooltip: 'Filtro'
                            }
                        }
                    }}
                />
            </MuiThemeProvider>
        </Area>
        
        <Snackbar anchorOrigin={{ vertical, horizontal }} open={alertSuccess} autoHideDuration={6000} onClose={handleCloseAlert}>
            <Alert onClose={handleCloseAlert} severity="info" sx={{ width: '100%' }}>
                {messageSuccess}
            </Alert>
        </Snackbar>

        <Snackbar anchorOrigin={{ vertical, horizontal }} open={alertError} autoHideDuration={6000} onClose={handleCloseAlert}>
            <Alert onClose={handleCloseAlert} severity="error" sx={{ width: '100%' }}>
                {messageError}
            </Alert>
        </Snackbar>

        <Backdrop
            sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
            open={loading}
        >
            <CircularProgress color="inherit" />
        </Backdrop>
        </>
    );
}

export default ListAdvertisements;