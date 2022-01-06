// Third Party Settings
import React, { useState, useEffect, forwardRef } from "react";
import MaterialTable from '@material-table/core';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';

// Own Settings
import api from '../config/api';

//Component
const User = () => {
    //States
    const [alertSuccess, setAlertSuccess] = useState(false);
    const [alertError, setAlertError] = useState(false);
    const [messageSuccess, setMessageSuccess] = useState('sucesso');
    const [messageError, setMessageError] = useState('erro');
    const [loading, setLoading] = useState(false);
    const [users, setUsers] = useState([]);

    //Load initial data
    useEffect(() => {
        (async () => {
            const { data } = await api.get('/users');
            setUsers(data);
        })();
    }, []);

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

    const handleAdd = (newData) => {
        setLoading(true);            

        api.post('/users', newData)
            .then(response => {
                if (response.status === 201) {
                    newData._id = response.data._id;
                    setUsers([...users, newData]);
                    setMessageSuccess('Usuário criado e convite enviado por e-mail');
                    setLoading(false);
                    handleShowAlertSuccess();
                    //console.log(response.data);
                }
            })
            .catch(error => {
                setLoading(false);
                handleShowAlertError();
                setMessageError(error.response.data.message);
                if( error.response ){
                    console.log(error.response.data); // => the response payload 
                }
            });
    };

    const handleDelete = (oldData) => {
        setLoading(true);            
 
        api.delete('/users/' + oldData._id)
            .then(response => {
                if (response.status === 200) {
                    const index = oldData.tableData.id;
                    const dataDelete = [...users];
                    dataDelete.splice(index, 1);
                    setUsers([...dataDelete]);   
                    setMessageSuccess('Usuário excluído com sucesso');
                    setLoading(false);
                    handleShowAlertSuccess();
                    //console.log(response.data);
                }
            })
            .catch(error => {
                setLoading(false);
                handleShowAlertError();
                setMessageError(error.response.data.message);
                if( error.response ){
                    console.log(error.response.data); // => the response payload 
                }
            });
    }

    const handleUpdate = (newData, oldData) => {
        setLoading(true);         
        api.put('/users', {email: newData.email, isAdmin: newData.isAdmin})
            .then(response => {
                if (response.status === 200) {
                    const dataUpdate = [...users];
                    const index = oldData.tableData.id;
                    dataUpdate[index] = newData;
                    setUsers([...dataUpdate]);
                    setMessageSuccess('Usuário alterado com sucesso');
                    setLoading(false);
                    handleShowAlertSuccess();
                    //console.log(response.data);
                }
            })
            .catch(error => {
                setLoading(false);
                handleShowAlertError();
                setMessageError(error.response.data.message);
                if( error.response ){
                    console.log(error.response.data); // => the response payload 
                }
            });
    }

    //Others
    const vertical = 'bottom';
    const horizontal = 'right';
    const Alert = forwardRef(function Alert(props, ref) {
        return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
    });

    return (
        <>
        <MaterialTable
            title="Usuários"
            columns={[
                { title: 'E-mail', field: 'email', editable: 'onAdd' },
                { title: 'Administrador', field: 'isAdmin', type: 'boolean', editable: 'always' }
            ]}
            data={users}
            editable={{
                onRowAdd: newData => new Promise((resolve) => {
                    handleAdd(newData);                    
                    resolve();
                }),
                onRowDelete: oldData => new Promise((resolve) => {
                    handleDelete(oldData)    
                    resolve();
                }),
                onRowUpdate: (newData, oldData) => new Promise((resolve) => {
                    handleUpdate(newData, oldData)    
                    resolve();
                }),
            }}
            options={{
                actionsColumnIndex: -1
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
                    searchPlaceholder: "Filtrar"
                },
                header: {
                    actions: 'Ações'
                },
                body: {
                    emptyDataSourceMessage: 'Sem dados para exibir',
                    deleteTooltip: 'Excluir',
                    editTooltip: 'Alterar',
                    addTooltip: 'Adicionar',
                    editRow:{
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
    )
}

export default User;