import { ActionType, createAsyncAction, createReducer } from 'typesafe-actions';
import { createStructuredSelector } from 'reselect';
import { SelectorDefault } from '../helpers/async-helpers';
import { asyncHelpers } from '../helpers';
import { AsyncTypes } from '../models';

type RequestData = null;

type FailureData = null;

export type SuccessData = {
  text: string;
}

export type CustomSelectors = {
  getText: string | undefined;
};

export type Selectors = SelectorDefault<CustomSelectors>;

export type ProfileState = AsyncTypes.ReducerState<SuccessData, FailureData>;

const actions = createAsyncAction(
  'PROFILE_API_REQUEST',
  'PROFILE_API_SUCCESS',
  'PROFILE_API_FAILURE'
)<
  asyncHelpers.AsyncRequest<RequestData>,
  asyncHelpers.Response<SuccessData, FailureData>,
  asyncHelpers.Response<SuccessData, FailureData>
>();

export type ProfileActions = ActionType<typeof actions>;

const saga = asyncHelpers.createAsyncSaga<
  SuccessData,
  FailureData,
  RequestData
>(actions);

const requestHandler = asyncHelpers.createRequestHandler<
  SuccessData,
  FailureData,
  RequestData
>(actions);

const responseHandler = asyncHelpers.createResponseHandler<
  SuccessData,
  FailureData,
  RequestData
>(actions);

const reducer = () =>
  createReducer<ProfileState, ProfileActions>(asyncHelpers.initialState())
    .handleAction(actions.request, (state, action) =>
      requestHandler(state, action)
    )
    .handleAction([actions.success, actions.failure], (state, action) => 
      responseHandler(state, action)
    );

const select = createStructuredSelector<ProfileState, {}, Selectors>({
  status: asyncHelpers.statusSelector(),
  data: createStructuredSelector<ProfileState, {}, CustomSelectors>({
    getText: state =>
      state?.response?.data?.text as string | undefined
  })
});

export { actions, reducer, saga, select };
