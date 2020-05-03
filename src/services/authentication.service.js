import {BehaviorSubject} from 'rxjs'
import {handleResponse} from "./handle-response";

const currentUserSubject = new BehaviorSubject(JSON.parse(localStorage.getItem('currentUser')));

// TODO: test to the currentUser token to see if it is still good.
export const authenticationService = {
    login,
    logout,
    currentUser: currentUserSubject.asObservable(),
    get currentUserValue() {
        return currentUserSubject.value
    }
};

function login(username, password) {

        const myHeaders = new Headers({
            'accept': 'application/json',
            'Content-Type': 'application/json'
        })
        const requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: JSON.stringify({email: username, password})
        }
        return fetch('/farm-production/token/login', requestOptions)
            .then(handleResponse)
            .then(user => {
                localStorage.setItem('currentUser', JSON.stringify(user));
                currentUserSubject.next(user);
                return user;
            })
}

function logout() {
    localStorage.removeItem('currentUser');
    currentUserSubject.next(null);
}
