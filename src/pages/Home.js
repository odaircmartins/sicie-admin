import React, { useContext } from "react";
import { Link, Router } from "react-router-dom";

import history from "../config/history";
import { Context } from "../context/authContext";
import Layout from "../layout/Layout";

const Panel = () => {
    const { handleLogout } = useContext(Context);

    return (
        <Layout>
            <Router history={history}>   
                <Link to="/painel"> Home </Link>
                <Link to="/usuarios"> Usuários </Link>
                <Link to="/alterar-senha"> Alterar senha </Link>
                <Link to="/listar-eventos"> Eventos </Link>
                <Link to="/prestadores-servico"> Serviços </Link>

                <button onClick={ handleLogout }>Logout</button>
            </Router>    
        </Layout>    
    )
}

export default Panel;