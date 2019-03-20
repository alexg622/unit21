import { combineReducers } from 'redux';
import githubDataReducer from './githubDataReducer'
import errorsReducer from "./errorsReducer"

export default combineReducers({
  errors: errorsReducer,
  userGitData: githubDataReducer
});
