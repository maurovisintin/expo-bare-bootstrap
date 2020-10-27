import { combineReducers } from 'redux';
import * as authenticationManager from './authentication-manager';
import setUp from './set-up';
import * as appState from './app-state';
import * as profile from './profile';

const appReducer = combineReducers({
  authenticationManager: authenticationManager.reducer(),
  setUp: setUp.reducer(),
  appState: appState.reducer(),
  profile: profile.reducer()
});

const actions = {
  authenticationManager: authenticationManager.actions,
  setUp: setUp.actions,
  appState: appState.actions,
  profile: profile.actions
};

const selectors = {
  authenticationManager: authenticationManager.select,
  appState: appState.select,
  profile: profile.select
};

export {
  actions,
  selectors,
  appReducer,
  appState,
  profile
};
