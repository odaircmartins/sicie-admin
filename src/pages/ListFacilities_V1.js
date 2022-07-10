// Third Party Settings
import React, { useState, useEffect, useContext, forwardRef } from "react";
import styled from "styled-components";
import Grid from '@mui/material/Grid';
import Barcode from "react-hooks-barcode";
import MaterialTable from '@material-table/core';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import Backdrop from '@mui/material/Backdrop';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import Title from '../uiComponents/Title';
import Area from '../uiComponents/Area';
import { ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles';
import { createTheme } from '@material-ui/core/styles';
import { Context } from "../context/authContext";
import { cpfMask } from "../uiComponents/MasksAndValidations";
import api from '../config/api';
import history from "../config/history";


const PrintableArea = styled.div`
  @media print {
    #no-print, #no-print *
    {
        display: none !important;
    }
  }
`

//Component
const ListFacilities = () => {
    //States
    const [ alertSuccess, setAlertSuccess ] = useState(false);
    const [ alertError, setAlertError ] = useState(false);
    const [ messageSuccess, setMessageSuccess ] = useState('sucesso');
    const [ messageError, setMessageError ] = useState('erro');
    const [ loading, setLoading ] = useState(false);
    const [ dataToPrint, setDataToPrint ] = useState('');
    const [ showBarcode, setShowBarcode ] = useState(false);
    const [ facilities, setFacilities ] = useState([]);

    const { setFacilityAction } = useContext(Context);
    const { setFacilityDataTransport } = useContext(Context);

    //Load initial data
    useEffect(() => {
        (async () => {
            const { data } = await api.get('/facilities');
            const dataFormated = data.map((register) => {
                return {
                    _id: register._id,
                    validFrom: register.validFrom,
                    validFromDate: new Intl.DateTimeFormat('pt-BR', { year: '2-digit', month: '2-digit', day: '2-digit' }).format(register.validFrom),
                    validUntil: register.validUntil,
                    validUntilDate: new Intl.DateTimeFormat('pt-BR', { year: '2-digit', month: '2-digit', day: '2-digit' }).format(register.validUntil),
                    name: register.name,                    
                    cpf: cpfMask(register.cpf),
                    company: register.company,
                    reason: register.reason,
                    barcode: register.barcode,
                    isActive: register.isActive
                }
            })

            setFacilityDataTransport('');
            setFacilities(dataFormated);
        })();
    }, [setFacilityDataTransport]);

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

        api.delete('/facilities/' + newData._id)
            .then(response => {
                if (response.status === 200) {
                    const dataUpdate = [...facilities];
                    const index = newData.tableData.id;
                    newData.isActive = false;
                    dataUpdate[index] = newData;
                    setFacilities([...dataUpdate]);
                    setMessageSuccess('Prestador de serviço inativado');
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
    };

    const handleOpenShowBarcode = (dados) => {
        setDataToPrint(dados);
        setShowBarcode(true);
    };

    const handleCloseShowBarcode = () => {        
        setShowBarcode(false);
    };

    const handlePrint = () => {
        window.print();
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
        <Title subtitle="Prestador de Serviço" title="Lista de Prestador de Serviços" />

        <Area>
            <MuiThemeProvider theme={theme}>
                <MaterialTable
                    style={{ boxShadow: 'none', fontSize: '14px' }}
                    title=""
                    columns={[
                        {
                            title: 'Nome',
                            field: 'name',
                            editable: 'always',
                            tooltip: 'Nome do prestador de serviço',
                            cellStyle: { width: '50%' }
                        },
                        {
                            title: 'CPF',
                            field: 'cpf',
                            editable: 'always',
                            cellStyle: { width: '100%' }
                        },
                        {
                            title: 'Empresa',
                            field: 'company',
                            editable: 'always',
                            tooltip: 'Empresa que o prestador de serviço trabalha',
                            cellStyle: { width: '100%' }                            
                        },
                        {
                            title: 'Início',
                            field: 'validFromDate',
                            type: 'date',
                            align: 'center',
                            cellStyle: { textAlign: "center" },
                            editable: 'always',
                            dateSetting: { format: 'dd/MM/yy' },
                            tooltip: 'A partir de quando o prestador de serviço poderá acessar'
                        },
                        {
                            title: 'Fim',
                            field: 'validUntilDate',
                            type: 'date',
                            align: 'center',
                            cellStyle: { textAlign: "center" },
                            editable: 'always',
                            dateSetting: { format: 'dd/MM/yy' },
                            tooltip: 'Até quando o prestador de serviço poderá acessar'
                        },
                        {
                            title: 'Ativo',
                            field: 'isActive',
                            type: 'boolean',
                            editable: 'always'
                        }
                    ]}
                    data={facilities}
                    actions={[
                        {
                            icon: 'add_circle',
                            tooltip: 'Novo',
                            isFreeAction: true,
                            onClick: (event) => {
                                setFacilityAction('Novo Prestador de Serviço');
                                history.push('/criar-prestador-servico');
                            }
                        },
                        rowData => ({
                            icon: 'qr_code',
                            tooltip: 'Exibir código de barras para acesso',
                            onClick: (event, rowData) => {
                                handleOpenShowBarcode(rowData);
                            }
                        }),
                        rowData => ({
                            icon: 'edit',
                            tooltip: 'Editar',
                            onClick: (event, rowData) => {
                                setFacilityAction('Editar Prestador de Serviço');
                                setFacilityDataTransport(rowData);
                                history.push('/criar-prestador-servico');
                            }
                        }),
                        rowData => ({
                            icon: 'library_add',
                            tooltip: 'Copiar',
                            onClick: (event, rowData) => {
                                setFacilityAction('Novo Prestador de Serviço');
                                setFacilityDataTransport(rowData);
                                history.push('/criar-prestador-servico')
                            }
                        }),
                        rowData => ({
                            icon: 'do_disturb_icon',
                            tooltip: 'Tornar evento inativo',
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

        <Dialog open={showBarcode} onClose={handleCloseShowBarcode}>
            <DialogTitle>Ficha de Acesso</DialogTitle>
            <PrintableArea>
            <DialogContent>
                <DialogContentText>
                    <Grid container spacing={2} alignItems="flex-start" direction="row">
                        <Grid item xs={12}>
                            Empresa: {dataToPrint.company}
                        </Grid>

                        <Grid item xs={12}>
                            Funcionário: {dataToPrint.name}
                        </Grid>

                        <Grid item xs={12}>
                            CPF: {dataToPrint.cpf}
                        </Grid>

                        <Grid item xs={12}>
                            Validade: {dataToPrint.validFromDate} até {dataToPrint.validUntilDate}
                        </Grid>

                        <Grid item xs={12}>
                            Motivo: {dataToPrint.reason}
                        </Grid>

                        <Grid item xs={12}>
                            <Barcode value={dataToPrint.barcode} />
                        </Grid>
                    </Grid>
                </DialogContentText>
            </DialogContent>
            <DialogActions id="no-print">
                <Button color="warning"  variant="outlined" onClick={handlePrint}>Imprimir</Button>
                <Button color="inherit" variant="outlined" onClick={handleCloseShowBarcode}>Fechar</Button>
            </DialogActions>
            </PrintableArea>
        </Dialog>
        </>
    );
}

export default ListFacilities;