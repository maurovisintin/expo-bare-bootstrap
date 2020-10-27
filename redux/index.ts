import { getType } from 'typesafe-actions';

import configureStore from './configure-store';
import { actions, selectors, appReducer } from './global';
// import createSentryMiddleware from '../services/logging/redux-sentry-middleware';
import rootSaga from './root-saga';
import * as global from './global';

const rootReducer = (state: any, action: any) => {
  const authManagerSuccessType = getType(actions.authenticationManager.success);
  const authManagerOperation = state && state.authenticationManager.operation;
  if (
    action.type === authManagerSuccessType &&
    authManagerOperation === 'signout'
  ) {
    return appReducer(undefined, action);
  }

  return appReducer(state, action);
};

const store = configureStore(rootReducer, rootSaga(), []);

export { actions, selectors, store, rootReducer, global };
