import { combineReducers } from 'redux';

import { authentication } from './authReducer';
import { user } from './userReducer'
import { favoriteJobs } from './seekersReducer';
import { jobs } from './jobsReducer'
const rootReducer = combineReducers({

  auth: authentication,
  user: user,
  favoriteJobs: favoriteJobs,
  jobs: jobs
});

export default rootReducer;