import React from 'react';
import {Route, Redirect} from 'react-router-dom';
import {authenticationService} from "../services/authentication.service";

export const PrivateRoute = ({comp: Component, ...rest}) => (
    <Route {...rest} render={props => {
        const currentUser = authenticationService.currentUserValue;
        // TODO: check to see if the token is valid?
        if (!currentUser) {
            return <Redirect to={{ pathname: '/login', state: { from: props.location } }} />
        }
        return <Component {...props} />
    }} />
)