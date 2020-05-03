import {handleResponse} from "./handle-response";
import {authHeader} from "./auth-header";

export const goatService = {
    fetchProducers
}

function fetchProducers() {
    const requestOptions = { method: 'GET', headers: authHeader() };
    return fetch('http://localhost:8080/farm-production/rest/lists/producers', requestOptions)
        .then(handleResponse);
}