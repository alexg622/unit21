import {GET_USER_REPOS, SET_API_KEY} from '../types/types'

const initialState = {
  userData: [],
  apiKey: ""
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
    default:
      return state
  }
}
