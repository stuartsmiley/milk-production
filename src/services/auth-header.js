import {authenticationService} from "./authentication.service";

export function authHeader() {
    const currentUser = authenticationService.currentUserValue;
    // todo: is the token valid?
    if (currentUser && currentUser.access_token) {
        return { Authorization: `Bearer ${currentUser.access_token}` };
    }
    return {};
}