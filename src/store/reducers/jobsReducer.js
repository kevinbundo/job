import { jobsType } from '../types';

const prevState = {}

export function jobs(state = prevState, action) {
    switch (action.type) {
        case jobsType.JOBS_REQUEST:
            return {
                jobsRequest: "REQUEST"
            };
        case jobsType.JOBS_SUCCESS:
            return {
                jobs: "JOBSSUCCESS"
            };
        case jobsType.JOBS_FAILURE:
            return {
                jobs: "JOBSFailure"
            };
        default:
            return state
    }
}