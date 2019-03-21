import {SET_ISSUES_BOOL, GET_USER_REPOS, SET_API_KEY, GET_ISSUES} from '../types/types'

const initialState = {
  userData: [],
  apiKey: "",
  issues: [],
  issuesBool: false
}

export default function(state = initialState, action) {
  switch(action.type) {
    case GET_USER_REPOS:
      return {
        ...state,
        userData: action.payload
      }
    case SET_API_KEY:
      return {
        ...state,
        apiKey: action.payload
      }
    case GET_ISSUES:
      return {
        ...state,
        issues: action.payload
      }
    case SET_ISSUES_BOOL:
      return {
        ...state,
        issuesBool: action.payload
      }
    default:
      return state
  }
}
