import React, { useContext } from "react";
import { Switch, Route, Redirect} from "react-router-dom";

import { Context } from "../context/authContext";
import Login from '../pages/Login';
import Layout from '../layout/Layout';
import Users from '../pages/Users';
import ChangePassword from '../pages/ChangePassword';
import CreateEvent from '../pages/CreateEvent';
import ListEvents from '../pages/ListEvents';

const CustomRoute = ({ isPrivate, ...rest }) => {
    const { loading, authenticated } = useContext(Context);

    if (loading) return <h1>Loading...</h1>;

    if (isPrivate && !authenticated) return <Redirect to='/login'/>;

    return <Route {...rest}/>;
};

const Routes = () => {
    return (
        <Switch>
            <CustomRoute exact path='/login' component={Login} />
            <Layout> 
                <CustomRoute isPrivate exact path="/usuarios" component={Users} />
                <CustomRoute isPrivate exact path="/alterar-senha" component={ChangePassword} />
                <CustomRoute isPrivate exact path="/criar-evento" component={CreateEvent} />
                <CustomRoute isPrivate exact path="/listar-eventos" component={ListEvents} />
            </Layout>
        </Switch>
    );
};

export default Routes;