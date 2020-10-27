import { takeLatest, all } from 'redux-saga/effects';
import { Action } from 'typesafe-actions';

import * as authenticationManager from './global/authentication-manager';
import setUp from './global/set-up';
import * as apiErrorManager from './global/api-error-manager';
import * as profileRedux from './global/profile';
import { profile } from '../services/api';

export default () => {
  return function* root() {
    // @ts-ignore
    yield all([
      takeLatest(
        authenticationManager.actions.request,
        authenticationManager.saga
      ),
      takeLatest(setUp.actions.request, setUp.saga),
      takeLatest(
        (action: Action) => action.type.includes('API_FAILURE'),
        apiErrorManager.saga
      ),
      takeLatest(
        profileRedux.actions.request.toString(),
        profileRedux.saga,
        profile.getProfile
      )
    ]);
  };
};
