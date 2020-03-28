import {BehaviorSubject} from 'rxjs';
import config from 'config';
import {handleResponse} from '@/_helpers';

const currentUserSubject = new BehaviorSubject(JSON.parse(sessionStorage.getItem('currentUser')));

export const authenticationService = {
    login,
    logout,
    currentUser: currentUserSubject.asObservable(),
    get currentUserValue() { return currentUserSubject.value}
};

function login(username, password) {
    const requestOptions = {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({username, password})
    };

    return fetch(`${config.apiUrl}/token/login`, requestOptions)
        .then(handleResponse)
        .then(user => {
            sessionStorage.setItem('currentUser', JSON.stringify(user));
            currentUserSubject.next(user);
            return user;
        });
}

function logout() {
    sessionStorage.removeItem('currentUser');
    currentUserSubject.next(null);
}