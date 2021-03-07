import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { getToken } from '../../utils/index';


const PublicRoute = ({component: Component, restricted, ...rest}) => {
    return (
        <Route {...rest} render={props => (
            getToken() && restricted  ?
                <Redirect to="/home" />
            : <Component {...props} />
        )} />
    );
};

export default PublicRoute;
