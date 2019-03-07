import _ from 'lodash';
import { REHYDRATE } from 'redux-persist/constants';
import { LIKE_JOB, CLEAR_JOB } from '../actions/types';

const initialState = [];

export default (state = initialState, action) => {
  switch (action.type) {
    case REHYDRATE:
      return action.payload.likedJobs || [];
    case LIKE_JOB:
      return _.uniqBy([action.payload, ...state], 'jobkey');
    case CLEAR_JOB:
      return [];
    default:
      return state;
  }
};
