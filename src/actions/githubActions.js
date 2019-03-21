import axios from "axios"
import {GET_USER_REPOS, SET_ISSUES_BOOL, GET_ERRORS, SET_API_KEY, GET_ISSUES} from '../types/types'

export const getUserRepos = (authToken) => dispatch => {
  return axios.get(`https://api.github.com/user/repos?access_token=${authToken}`)
  .then(res => {
    return dispatch({
      type: GET_USER_REPOS,
      payload: res.data
    })
  }).catch(err => {
    return dispatch({
      type: GET_ERRORS,
      payload: err
    })
  })
}

export const getIssues = (authToken, owner, repo) => dispatch => {
  return axios.get(`https://api.github.com/repos/${owner}/${repo}/issues?access_token=${authToken}`)
  .then(res => {
    return dispatch({
      type: GET_ISSUES,
      payload: res.data
    })
  }).catch(err => {
    return dispatch({
      type: GET_ERRORS,
      payload: err
    })
  })
}

export const setApiKey = (apiKey) => dispatch => {
  return dispatch({
    type: SET_API_KEY,
    payload: apiKey
  })
}

export const setIssuesBool = (bool) => dispatch => {
  return dispatch({
    type: SET_ISSUES_BOOL,
    payload: bool
  })
}
