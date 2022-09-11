import React, { useContext } from "react";
import { Switch, Route, Redirect} from "react-router-dom";

import { Context } from "../context/authContext";
import Login from '../pages/Login';
import Layout from '../layout/Layout';
import Users from '../pages/Users';
import ChangePassword from '../pages/ChangePassword';
import CreateEvent from '../pages/CreateEvent_V3';
import CreateFacility from '../pages/CreateFacility_V1';
import ListEvents from '../pages/ListEvents_V3';
import ListFacilities from '../pages/ListFacilities_V1';
import ListAdvertisements from '../pages/ListAdvertisements_V1';
import CreateAdvertisement from '../pages/CreateAdvertisement_V1';

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
                <CustomRoute isPrivate exact path="/senha" component={ChangePassword} />
                <CustomRoute isPrivate exact path="/eventos" component={ListEvents} />
                <CustomRoute isPrivate exact path="/criar-evento" component={CreateEvent} />
                <CustomRoute isPrivate exact path="/servicos" component={ListFacilities} />
                <CustomRoute isPrivate exact path="/criar-servico" component={CreateFacility} />
                <CustomRoute isPrivate exact path="/anunciantes" component={ListAdvertisements} />
                <CustomRoute isPrivate exact path="/criar-anunciante" component={CreateAdvertisement} />
            </Layout>
        </Switch>
    );
};

export default Routes;