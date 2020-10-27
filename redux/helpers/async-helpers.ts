import { ApiErrorResponse, ApiOkResponse } from 'apisauce';
import { put, call } from 'redux-saga/effects';
import { AsyncActionCreator } from 'typesafe-actions';
import { createStructuredSelector } from 'reselect';

import { AsyncTypes } from '../models';

export interface Response<SuccessData, FailureData> {
  push?: Function;
  response: ApiOkResponse<SuccessData> | ApiErrorResponse<FailureData>;
}

export type AsyncRequest<Data = {}> = {
  onSuccess?: Function;
  onError?: Function;
  push?: Function;
  data?: Data;
};

export type Actions<SuccessData, FailureData, RequestData> = AsyncActionCreator<
  [string, AsyncRequest<RequestData>],
  [string, Response<SuccessData, FailureData>],
  [string, Response<SuccessData, FailureData>]
>;

interface StatusProps {
  loading: boolean | undefined;
  success: boolean | undefined;
  code: number | undefined;
}

export interface SelectorDefault<Data = undefined> {
  status: StatusProps;
  data: Data;
}

const initialState = <SuccessData, FailureData>(): AsyncTypes.ReducerState<
  SuccessData,
  FailureData
> => ({
  loading: undefined,
  success: undefined,
  response: undefined
});

function createRequestHandler<SuccessData, FailureData, RequestData = {}>(
  actions: Actions<SuccessData, FailureData, RequestData>
) {
  return <SuccessData, FailureData>(
    state: AsyncTypes.ReducerState<SuccessData, FailureData>,
    action: ReturnType<typeof actions.request>
  ) => {
    return {
      ...state,
      loading: true
    };
  };
}

function createResponseHandler<SuccessData, FailureData, RequestData = {}>(
  actions: Actions<SuccessData, FailureData, RequestData>
) {
  return <SuccessData, FailureData>(
    state: AsyncTypes.ReducerState<SuccessData, FailureData>,
    action:
      | ReturnType<typeof actions.success>
      | ReturnType<typeof actions.failure>
  ) => {
    return {
      ...state,
      loading: false,
      success:
        action.payload &&
        action.payload.response &&
        !!action.payload.response.status &&
        action.payload.response.status >= 200 &&
        action.payload.response.status <= 299,
      response: action.payload && action.payload.response // TODO ISSUE IS HERE
    };
  };
}

function* success<RequestData, SuccessData, FailureData>(
  payload: AsyncRequest<RequestData>,
  response: ApiOkResponse<SuccessData> | ApiErrorResponse<FailureData>,
  successAction: any
) {
  if (payload && payload.onSuccess) payload.onSuccess();
  yield put(successAction({ response }));
  return response;
}

function* error<RequestData, FailureData>(
  payload: AsyncRequest<RequestData>,
  response: ApiErrorResponse<FailureData>,
  failureAction: any
) {
  // we can use payload.isCritical to manage it globally here

  if (payload && payload.onError)
    payload.onError(response ? response.problem : 'Server error');
  yield put(failureAction({ response }));

  return response;
}

function createAsyncSaga<SuccessData, FailureData, RequestData = {}>(
  actions: Actions<SuccessData, FailureData, RequestData>
) {
  return function* saga(
    // eslint-disable-next-line
    apiCall: (...args: any[]) => void,
    action: ReturnType<typeof actions.request>
  ): Generator {
    try {
      const data =
        action.payload && action.payload.data ? action.payload.data : {};

      const apiResponse = (yield call(apiCall, data)) as
        | ApiOkResponse<SuccessData>
        | ApiErrorResponse<FailureData>;

      if (apiResponse.ok) {
        // happy path
        return yield call(
          success,
          action.payload,
          apiResponse,
          actions.success
        );
      }

      return yield call(error, action.payload, apiResponse, actions.failure);
    } catch (e) {
      return e;
    }
  };
}

function statusSelector<SuccessData, FailureData>() {
  type State = AsyncTypes.ReducerState<SuccessData, FailureData>;
  return createStructuredSelector<State, {}, StatusProps>({
    loading: state => state.loading,
    success: state => state.success,
    code: state => state && state.response && state.response.status
  });
}

function getValue<SuccessData, FailureData>(
  state: AsyncTypes.ReducerState<SuccessData, FailureData>,
  key?: keyof SuccessData
) {
  if (!state.success) return undefined;
  if (state.response != null && state.response.data != null) {
    if (key) {
      if (
        typeof state.response.data === 'object' &&
        key in state.response.data
      ) {
        return (state.response as { data: SuccessData }).data[key];
      }
      return undefined;
    }
    return state.response.data;
  }
  return undefined;
}

export {
  getValue,
  initialState,
  createResponseHandler,
  createAsyncSaga,
  createRequestHandler,
  statusSelector
};
