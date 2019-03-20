import axios from "axios"
import {GET_USER_REPOS, GET_ERRORS} from '../types/types'

export const getUserRepos = (authToken) => dispatch => {
  return axios.get(`https://api.github.com/user/repos?access_token=${authToken}`)
  .then(res => {
    console.log("here");
    return dispatch({
      type: GET_USER_REPOS,
      payload: res.data
    })
  }).catch(err => {
    console.log("in error");
    return dispatch({
      type: GET_ERRORS,
      payload: err
    })
  })
}
