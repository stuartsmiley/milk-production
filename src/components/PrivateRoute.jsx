import React from 'react';
import {Route, Redirect} from 'react-router-dom';
import {authenticationService} from "../services/authentication.service";

// https://jasonwatmore.com/post/2019/04/06/react-jwt-authentication-tutorial-example
export const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route {...rest} render={props => {
        const currentUser = authenticationService.currentUserValue;
        if (!currentUser) {
            return <Redirect to={{ pathname: '/login', state: { from: props.location } }} />
        }
        // authorized so return component
        return <Component {...props} />
    }}/>
)