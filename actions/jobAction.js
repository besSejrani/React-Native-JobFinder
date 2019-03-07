import { FETCH_JOBS, LIKE_JOB, CLEAR_JOB } from './types';
import { geo2zip } from 'geo2zip';
import qs from 'qs';

import JOB_DATA from '../api/IndeedJobData.json';

const JOB_ROOT_URL = 'http://api.indeed.com/ads/apisearch?';
const JOB_QUERY_PARAMS = {
  publisher: '1303284387458115',
  format: 'json',
  v: '2',
  latlong: 1,
  radius: 10,
  q: 'javascript'
};

const buildJobsUrl = zip => {
  const query = qs.stringify({ ...JOB_QUERY_PARAMS, l: zip });
  return `${JOB_ROOT_URL}${query}`;
};

export const fetchJobs = (region, callback) => async dispatch => {
  try {
    let zip = await geo2zip(region);
    const url = buildJobsUrl(zip);
    console.log(url);
    dispatch({ type: FETCH_JOBS, payload: JOB_DATA });
    callback();
  } catch (err) {
    console.error(err);
  }
};

export const likeJob = job => {
  return { type: LIKE_JOB, payload: job };
};

export const clearJob = () => {
  return {
    type: CLEAR_JOB
  };
};
