import { ActionType, createAsyncAction, createReducer } from 'typesafe-actions';
import { put, call, take } from 'redux-saga/effects';

import * as profile from './profile';
import loggingService from '../../services/logging';
import { client } from '../../services/api';

export type SetUpState = {
  loading: boolean;
  completed: boolean;
  errorMessage: string | undefined;
};

export type SetUpOptions = {
  deepLinkHandler?: () => void;
};

const actions = createAsyncAction(
  'SET_UP_REQUEST',
  'SET_UP_SUCCESS',
  'SET_UP_FAILURE'
)<{ options: SetUpOptions }, undefined, { errorMessage: string }>();

export type SetUpActions = ActionType<typeof actions>;

/*
   Fetch the authSettings from api.iconia, and initialise the auth service.
   Will throw errors on fail as this is mission critical.
   TODO add in fetch for settings from api.app.
 */

/*
   Will request the authentication status of the user
   and return a the result.
 */
function* setUpFailure(errorMessage: string) {
  loggingService.setError(
    new Error(`setupFailure, signing out. ${errorMessage}`)
  );
  try {
    // TODO Maybe we need to listen to authenticationManager.success / failure?
    // yield put(
    //   authenticationManager.actions.request({
    //     operation: 'signout',
    //     onSuccess: () => {
    //       replace(routeConstants.MAIN, { screen: routeConstants.TABS });
    //     },
    //     onError: () =>
    //       replace(routeConstants.MAIN, { screen: routeConstants.ERROR_SETUP })
    //   })
    // );
  } catch (e) {
    // Real edge case, sign out fails. Reload the app.
    // yield call(Updates.reloadAsync);
  }
  yield put(
    actions.failure({
      errorMessage
    })
  );
}

function* setUpSaga() {
  try {
    client.init('https://cat-fact.herokuapp.com');

    yield put(actions.success());
  } catch (e) {
    yield setUpFailure(`${e}`);
  }
}

const reducer = () =>
  createReducer<SetUpState, SetUpActions>({
    completed: false,
    loading: false,
    errorMessage: undefined
  })
    .handleAction(actions.request, state => ({ ...state, loading: true }))
    .handleAction(actions.success, state => ({
      ...state,
      loading: false,
      completed: true
    }))
    .handleAction(actions.failure, (state, { payload: { errorMessage } }) => ({
      loading: false,
      completed: false,
      errorMessage
    }));

export default { actions, reducer, saga: setUpSaga };
