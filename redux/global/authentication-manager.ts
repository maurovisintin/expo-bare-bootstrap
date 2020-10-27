import { ActionType, createAsyncAction, createReducer } from 'typesafe-actions';
import { put, call } from 'redux-saga/effects';
import { createStructuredSelector } from 'reselect';

import authService from '../../services/auth-service';

export type OperationType = 'status' | 'signout' | 'signin' | 'signup';

export type Selectors = {
  getIsAuthenticated: boolean | undefined;
  getLoading: boolean;
  getError: boolean;
  getOperation: OperationType | undefined;
};

type RequestData = {
  operation: OperationType;
  onSuccess?: () => void;
  onError?: (error: string) => void;
};

type SuccessData = {
  authenticated: boolean;
};

type FailureData = { error: boolean };

export type AuthManagerState = {
  loading: boolean;
  isAuthenticated: boolean;
  operation: OperationType | undefined;
  error: boolean;
};

const actions = createAsyncAction(
  'AUTH_MANAGER_REQUEST',
  'AUTH_MANAGER_SUCCESS',
  'AUTH_MANAGER_FAILURE'
)<RequestData, SuccessData, FailureData>();

export type AuthManagerActions = ActionType<typeof actions>;

export const mapAuthOperation = (operation: OperationType) => {
  switch (operation) {
    case 'status':
      return authService.isAuthenticated;
    case 'signin':
      return authService.signin;
    case 'signup':
      return authService.signup;
    case 'signout':
      return authService.signout;
    default:
      return () => ({ success: false });
  }
};

function* saga(action: ReturnType<typeof actions.request>) {
  try {
    const { onSuccess, onError, operation } = action.payload;

    const authOperation = mapAuthOperation(operation);

    const result = yield call(authOperation);
    if (result && result.success) {
      // now we should update authentication status
      yield put(actions.success({ authenticated: result.authenticated }));

      if (onSuccess) {
        if (operation === 'signout') {
          yield put(products.actions.getProducts.request({}));
          yield put(marketDataManager.actions.request({}));
        }
        yield call(onSuccess);
      }
    } else {
      yield put(actions.failure({ error: true }));
      if (onError) {
        yield call(onError, result.error);
      }
    }
  } catch (e) {
    yield put(actions.failure({ error: true }));
  }
}

const reducer = () =>
  createReducer<AuthManagerState, AuthManagerActions>({
    loading: false,
    isAuthenticated: false,
    operation: undefined,
    error: false
  })
    .handleAction(actions.request, (state, action) => ({
      ...state,
      loading: true,
      operation: action.payload.operation,
      error: false
    }))
    .handleAction(actions.success, (state, action) => ({
      ...state,
      loading: false,
      isAuthenticated: action.payload.authenticated
    }))
    .handleAction(actions.failure, (state, action) => ({
      ...state,
      loading: false,
      operation: undefined,
      error: action.payload.error
    }));

const select = createStructuredSelector<AuthManagerState, {}, Selectors>({
  getIsAuthenticated: state => state.isAuthenticated,
  getOperation: state => state.operation,
  getLoading: state => state.loading,
  getError: state => state.error
});

export { actions, reducer, select, saga };
