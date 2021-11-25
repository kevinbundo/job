import { favoriteJobsType } from '../types';
import { favoriteJobs } from '../services/seekersServices';

export function addFavoriteJobs(idUser, idJobs) {
    return dispatch => {
        favoriteJobs.addFavoriteJobs(idUser, idJobs)
            .then(
                data => {
                    if (data.id) {
                        dispatch(success(data));
                    } else {
                        dispatch(failure(data));
                    }
                }
            )
    };
    function success(data) { return { type: favoriteJobsType.JOBS_FAVORITE_SUCCESS, data } }
    function failure(data) { return { type: favoriteJobsType.JOBS_FAVORITE_FAILURE, data } }
}

export function removefavoriteJobs(id) {
    return dispatch => {
        favoriteJobs.removefavoriteJobs(id)
            .then(
                data => {
                    if (data.status) {
                        dispatch(success(data))
                    } else {
                        dispatch(failure(data));
                    }
                }
            )
    };

    function success(data) { return { type: favoriteJobsType.JOBS_FAVORITE_SUCCESS, data } }
    function failure(data) { return { type: favoriteJobsType.JOBS_FAVORITE_FAILURE, data } }
}