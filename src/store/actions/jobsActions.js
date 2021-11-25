import { jobsType } from '../types';
import { jobsService } from '../services/jobsServices';
import { history } from '../../utils/history';


export function createJobs(idCreatet, title,position, description,nameCompany, numberCompany, emailCompany, webCompany, type) {
    return dispatch => {
        dispatch(request(title));
        jobsService.createJobs(idCreatet, title,position, description,nameCompany, numberCompany, emailCompany, webCompany, type)
            .then(
                data => {
                    if (data.title) {
                        dispatch(success(data));
                        history.push(`/jobs/${data.id}`);
                    } else {
                        dispatch(failure(data));
                    }
                }
            )
    };

    function request(data) { return { type: jobsType.JOBS_REQUEST, data } }
    function success(data) { return { type: jobsType.JOBS_SUCCESS, data } }
    function failure(data) { return { type: jobsType.JOBS_FAILURE, data } }
}

export function updateJobs(idCreatet, title,position, description,nameCompany, numberCompany, emailCompany, webCompany,type, id) {
    return dispatch => {
        dispatch(request(title));
        jobsService.updateJobs(idCreatet, title,position, description,nameCompany, numberCompany, emailCompany, webCompany, type, id)
            .then(
                data => {
                    if (data.status) {
                        dispatch(failure(data));
                    } else {
                        dispatch(success(data));
                        history.push(`/jobs/${data.id}`);
                    }
                }
            )
    };

    function request(data) { return { type: jobsType.JOBS_REQUEST, data } }
    function success(data) { return { type: jobsType.JOBS_SUCCESS, data } }
    function failure(data) { return { type: jobsType.JOBS_FAILURE, data } }
}

export function deleteJobs(id) {
    return dispatch => {
        dispatch(request(id));
        jobsService.deleteJobs(id)
            .then(
                data => {
                    if (data.status) {
                        dispatch(failure(data));
                    } else {
                        dispatch(success(data));
                        history.push(`/`)
                    }
                }
            )
    };

    function request(data) { return { type: jobsType.JOBS_REQUEST, data } }
    function success(data) { return { type: jobsType.JOBS_SUCCESS, data } }
    function failure(data) { return { type: jobsType.JOBS_FAILURE, data } }
}