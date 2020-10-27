// import { expectSaga, SagaType } from 'redux-saga-test-plan';
// import { createAsyncAction } from 'typesafe-actions';
// import {
//   getValue,
//   initialState,
//   createResponseHandler,
//   createAsyncSaga,
//   statusSelector,
//   createRequestHandler,
//   AsyncRequest,
//   Response
// } from './async-helpers';
// import apiErrorLog from '../global/api-error-log';
// import { AsyncTypes } from '../../models';

// type RequestData = { isCritical?: boolean; backgroundRefresh?: boolean };
// type SuccessData = { text: string };
// type FailureData = null;
// type TestState = AsyncTypes.ReducerState<SuccessData, FailureData>;
// const actions = createAsyncAction(
//   'TEST_ACTION_REQUEST',
//   'TEST_ACTION_SUCCESS',
//   'TEST_ACTION_FAILURE'
// )<
//   AsyncRequest<RequestData>,
//   Response<SuccessData, FailureData>,
//   Response<SuccessData, FailureData>
// >();

// const requestHandler = createRequestHandler(actions);
// const responseHandler = createResponseHandler(actions);

// describe('getValue', () => {
//   it('should handle empty response with no key', () => {
//     const state: TestState = {
//       loading: false,
//       success: true,
//       response: undefined,
//       isCritical: false,
//       backgroundRefresh: false
//     };
//     expect(getValue(state)).toBe(undefined);
//   });

//   it('should handle empty response with a key', () => {
//     const state: TestState = {
//       loading: false,
//       success: true,
//       response: undefined,
//       isCritical: false,
//       backgroundRefresh: false
//     };
//     expect(getValue(state, 'text')).toBe(undefined);
//   });

//   it('should return the key in the object', () => {
//     const state: TestState = {
//       loading: false,
//       success: true,
//       response: {
//         ok: true,
//         problem: null,
//         originalError: null,
//         data: {
//           text: 'foo'
//         }
//       },
//       isCritical: false,
//       backgroundRefresh: false
//     };
//     expect(getValue(state, 'text')).toEqual('foo');
//   });

//   it('should return property by key', () => {
//     const state: TestState = {
//       loading: false,
//       success: true,
//       response: {
//         ok: true,
//         problem: null,
//         originalError: null,
//         data: {
//           text: 'foo'
//         }
//       },
//       isCritical: false,
//       backgroundRefresh: false
//     };
//     expect(getValue(state, 'text')).toBe('foo');
//   });

//   it('should return the whole response with no key', () => {
//     const state: TestState = {
//       loading: false,
//       success: true,
//       response: {
//         ok: true,
//         problem: null,
//         originalError: null,
//         data: {
//           text: 'foo'
//         }
//       },
//       isCritical: false,
//       backgroundRefresh: false
//     };
//     expect(JSON.stringify(getValue(state))).toBe(
//       JSON.stringify({ text: 'foo' })
//     );
//   });
// });

// describe('Request handler', () => {
//   it('should modify loading property', () => {
//     let state: TestState = initialState();

//     expect(state.loading).toBeUndefined();
//     expect(state.success).toBeUndefined();
//     expect(state.response).toBeUndefined();

//     state = requestHandler(state, {
//       type: '',
//       payload: {}
//     });

//     expect(state.loading).toBeTruthy();
//     expect(state.success).toBeUndefined();
//     expect(state.response).toBeUndefined();
//   });

//   it('should modify isCritical property', () => {
//     let state: TestState = initialState();

//     expect(state.loading).toBeUndefined();
//     expect(state.success).toBeUndefined();
//     expect(state.response).toBeUndefined();
//     expect(state.isCritical).toBeFalsy();

//     state = requestHandler(state, {
//       type: '',
//       payload: {
//         isCritical: true
//       }
//     });

//     expect(state.loading).toBeTruthy();
//     expect(state.isCritical).toBeTruthy();
//     expect(state.success).toBeUndefined();
//     expect(state.response).toBeUndefined();
//   });
// });

// describe('Response handler', () => {
//   let state: TestState = initialState();

//   it('should modify success property', () => {
//     state = responseHandler(state, {
//       type: '',
//       payload: {
//         response: {
//           ok: true,
//           problem: null,
//           originalError: null,
//           status: 400,
//           data: undefined
//         }
//       }
//     });

//     expect(state.success).toEqual(false);

//     state = responseHandler(state, {
//       type: '',
//       payload: {
//         response: {
//           ok: true,
//           problem: null,
//           originalError: null,
//           status: 200,
//           data: undefined
//         }
//       }
//     });

//     expect(state.success).toEqual(true);
//   });

//   it('should return response', () => {
//     state = responseHandler(state, {
//       type: '',
//       payload: {
//         response: {
//           ok: true,
//           problem: null,
//           originalError: null,
//           status: 200,
//           data: {
//             text: 'foo'
//           }
//         }
//       }
//     });

//     expect(state.response && state.response.data).toEqual({ text: 'foo' });
//   });
// });

// describe('statusSelector', () => {
//   it('should select status from state', () => {
//     const state: TestState = {
//       loading: false,
//       success: true,
//       response: {
//         ok: true,
//         problem: null,
//         originalError: null,
//         data: {
//           text: 'foo'
//         }
//       },
//       isCritical: false,
//       backgroundRefresh: false
//     };
//     const status = statusSelector<SuccessData, FailureData>();

//     expect(status(state, {})).toEqual({
//       loading: false,
//       success: true,
//       response: undefined,
//       isCritical: false,
//       backgroundRefresh: false,
//       code: undefined
//     });
//   });
// });

// describe('createAsyncSaga', () => {
//   it('should handle failure response', () => {
//     const saga = createAsyncSaga<SuccessData, FailureData, RequestData>(
//       actions
//     );
//     const apiCall = () => ({
//       ok: false,
//       problem: 'SERVER_ERROR',
//       headers: {
//         date: ''
//       },
//       originalError: {
//         name: '',
//         message: '',
//         config: {}
//       }
//     });

//     return expectSaga(saga as SagaType, apiCall, actions.request)
//       .put(
//         apiErrorLog.actions.request({
//           errorType: 'SERVER_ERROR',
//           statusCode: undefined,
//           message: '',
//           url: undefined,
//           date: '',
//           correlationId: 'not present',
//           data: 'not present',
//           viewed: false
//         })
//       )
//       .run();
//   });

//   it('should handle success response', () => {
//     const saga = createAsyncSaga<SuccessData, FailureData, RequestData>(
//       actions
//     );
//     const apiCall = () => ({
//       ok: true,
//       problem: null,
//       originalError: null,
//       status: 200,
//       data: undefined
//     });

//     return expectSaga(saga as SagaType, apiCall, actions.request)
//       .put(
//         actions.success({
//           response: {
//             ok: true,
//             problem: null,
//             originalError: null,
//             status: 200,
//             data: undefined
//           }
//         })
//       )
//       .run();
//   });
// });
