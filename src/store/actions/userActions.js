import { userAuthType, userType } from '../types'
import { userService } from '../services/userServices';
import { history } from '../../utils/history';


export function registrationUser(firstName, lastName, email, phoneNumber, role, password) {
    return dispatch => {
        dispatch(request(email));
        userService.registrationUser(firstName, lastName, email, phoneNumber, role, password)
            .then(
                data => {
                    if (data.email) {
                        dispatch(success(data));
                        history.push('/login');
                    } else {
                        dispatch(failure(data));

                    }
                }
            )
    };

    function request(data) { return { type: userType.USER_REQUEST, data } }
    function success(data) { return { type: userType.USER_SUCCESS, data } }
    function failure(data) { return { type: userType.USER_FAILURE, data } }
}

export function updateUser(idUser, firstName, lastName, email, phoneNumber, role, password) {
    return dispatch => {
        dispatch(request(idUser));
        userService.updateUser(idUser, firstName, lastName, email, phoneNumber, role, password)
            .then(
                data => {
                    if (data.status) {
                        dispatch(failure(data));
                    } else {
                        dispatch(success(data));
                        history.push('/');
                    }
                }
            )
    };

    function request(data) { return { type: userType.USER_REQUEST, data } }
    function success(data) { return { type: userAuthType.LOGIN_SUCCESS, data } }
    function failure(data) { return { type: userType.USER_FAILURE, data } }
}

export function deleteUser(id) {
    return dispatch => {
        dispatch(request(id));
        userService.deleteUser(id)
            .then(
                data => {
                    if (data.status) {
                        dispatch(success(data));
                        history.push('/');
                    } else {
                        dispatch(failure(data));
                    }
                }
            )
    };

    function request(data) { return { type: userType.USER_REQUEST, data } }
    function success(data) { return { type: userAuthType.LOGOUT, data } }
    function failure(data) { return { type: userType.USER_FAILURE, data } }
}