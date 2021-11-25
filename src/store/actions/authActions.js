import { userAuthType } from '../types';
import { userAuthService } from '../services/authServices';
import { history } from '../../utils/history';


export function login(email, password) {
    return dispatch => {
        dispatch(request(email));
        userAuthService.login(email, password)
            .then(
                data => {
                    if (data[0]?.firstName) {
                        dispatch(success(data[0]));
                        history.push('/');
                    } else {
                        dispatch(failure(data));
                    }
                }
            )
    };

    function request(data) { return { type: userAuthType.LOGIN_REQUEST, data } }
    function success(data) { return { type: userAuthType.LOGIN_SUCCESS, data } }
    function failure(data) { return { type: userAuthType.LOGIN_FAILURE, data } }
}

export function logout() {
    return dispatch => {
        const data = ""
        dispatch(success(data));
    }

    function success() { return { type: userAuthType.LOGOUT } }
}

