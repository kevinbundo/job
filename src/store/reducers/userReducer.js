import { userType } from '../types';

const prevState = {}

export function user(state = prevState, action) {
    switch (action.type) {
        case userType.USER_REQUEST:
            return {
                userRequest: 'userRequest'
            }
        case userType.USER_SUCCESS:
            return {
                userSUCCESS: 'userSUCCESS'

            };
        case userType.USER_FAILURE:
            return {
                userFAILURE: 'userFAILURE'
            };

        default:
            return state
    }
}