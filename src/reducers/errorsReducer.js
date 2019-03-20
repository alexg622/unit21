import { GET_ERRORS, CLEAR_ERRORS } from '../types/types';

const initialState = {};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_ERRORS:
      return action.payload || {error: "Bad Request"}
    case CLEAR_ERRORS:
      return {};
    default:
      return state;
  }
}