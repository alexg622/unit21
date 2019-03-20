import {GET_USER_REPOS} from '../types/types'

const initialState = {
  userData: []
}

export default function(state = initialState, action) {
  switch(action.type) {
    case GET_USER_REPOS:
      return {
        ...state,
        userData: action.payload
      }
    default:
      return state
  }
}
