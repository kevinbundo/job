import { userAuthType } from '../types';

const prevState = {
    loggedIn: false,
}

export function authentication(state = prevState, action) {
    switch (action.type) {
        case userAuthType.LOGIN_SUCCESS:
            return {
                loggedIn: true,
                firstName: action.data.firstName,
                lastName: action.data.lastName,
                role: action.data.role,
                email: action.data.email,
                phoneNumber: action.data.phoneNumber,
                userId: action.data.id,
            };
        case userAuthType.LOGIN_FAILURE:
            return {
                loggedIn: false,
                invalidLogin: "Invalid email or password"
            };

        case userAuthType.LOGIN_REQUEST:
            return {
                loggedIn: false,
                request: 'request'
            }
        case userAuthType.LOGOUT:
            return {
                loggedIn: false,
            };
        default:
            return state
    }
}