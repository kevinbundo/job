import { favoriteJobsType } from '../types';

const prevState = {}

export function favoriteJobs(state = prevState, action) {
    switch (action.type) {
        case favoriteJobsType.JOBS_FAVORITE_SUCCESS:
            return {
                favorite: "favorite"
            };
        case favoriteJobsType.JOBS_FAVORITE_FAILURE:
            return {
                favoriteFailure: "favoriteFailure"
            };
        default:
            return state
    }
}