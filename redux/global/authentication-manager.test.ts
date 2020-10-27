import { testSaga } from 'redux-saga-test-plan';

import { products } from 'profiles-shared';

import * as authenticationManager from './authentication-manager';
import * as marketDataManager from './market-data-manager';

jest
  .mock('./authentication-manager')
  .fn()
  .mockReturnValue({
    actions: {
      request: jest.fn((payload: any) => ({
        type: 'AUTH_MANAGER_REQUEST',
        payload
      })),
      success: jest.fn((payload: any) => ({
        type: 'AUTH_MANAGER_SUCCESS',
        payload
      })),
      failure: jest.fn((payload: any) => ({
        type: 'AUTH_MANAGER_FAILURE',
        payload
      }))
    }
  });

jest
  .mock('./market-data-manager')
  .fn()
  .mockReturnValue({
    actions: {
      request: jest.fn((payload: any) => ({
        type: 'MARKET_DATA_MANAGER_REQUEST',
        payload
      })),
      success: jest.fn((payload: any) => ({
        type: 'MARKET_DATA_MANAGER_SUCCESS',
        payload
      })),
      failure: jest.fn((payload: any) => ({
        type: 'MARKET_DATA_MANAGER_FAILURE',
        payload
      }))
    }
  });

jest.mock('../../services/auth-service', () => ({
  init: jest.fn(() => {}),
  isAuthenticated: jest.fn(() => {}),
  checkTokenExpiration: jest.fn(() => {}),
  signin: jest.fn(() => {}),
  signup: jest.fn(() => {}),
  signout: jest.fn(() => {})
}));

describe('authentication-manager - unit', () => {
  describe('SIGN IN', () => {
    const action = {
      payload: {
        operation: 'signin',
        onSuccess: () => {},
        onError: () => {}
      }
    };

    const authOperation = authenticationManager.mapAuthOperation(
      action.payload.operation as authenticationManager.OperationType
    );

    it('After signin it dispatches success with authenticated true', () => {
      testSaga(authenticationManager.saga, action)
        .next()
        .call(authOperation)
        .next({ success: true, authenticated: true })
        .put(authenticationManager.actions.success({ authenticated: true }))
        .next()
        .call(action.payload.onSuccess)
        .next()
        .isDone();
    });

    it('After signin failure it dispatches failure with authenticated false', () => {
      testSaga(authenticationManager.saga, action)
        .next()
        .call(authOperation)
        .next({ success: false, authenticated: false })
        .put(authenticationManager.actions.failure({ error: true }))
        .next()
        .call(action.payload.onError, undefined)
        .next()
        .isDone();
    });
  });

  describe('SIGN UP', () => {
    const action = {
      payload: {
        operation: 'signup',
        onSuccess: () => {},
        onError: () => {}
      }
    };

    const authOperation = authenticationManager.mapAuthOperation(
      action.payload.operation as authenticationManager.OperationType
    );

    it('After signup it dispatches success with authenticated true', () => {
      testSaga(authenticationManager.saga, action)
        .next()
        .call(authOperation)
        .next({ success: true, authenticated: true })
        .put(authenticationManager.actions.success({ authenticated: true }))
        .next()
        .call(action.payload.onSuccess)
        .next()
        .isDone();
    });

    it('After signup failure it dispatches failure with authenticated false', () => {
      testSaga(authenticationManager.saga, action)
        .next()
        .call(authOperation)
        .next({ success: false, authenticated: false })
        .put(authenticationManager.actions.failure({ error: true }))
        .next()
        .call(action.payload.onError, undefined)
        .next()
        .isDone();
    });
  });

  describe('SIGN OUT', () => {
    const action = {
      payload: {
        operation: 'signout',
        onSuccess: () => {},
        onError: () => {}
      }
    };

    const authOperation = authenticationManager.mapAuthOperation(
      action.payload.operation as authenticationManager.OperationType
    );

    it('After signout it dispatches success with authenticated false', () => {
      testSaga(authenticationManager.saga, action)
        .next()
        .call(authOperation)
        .next({ success: true, authenticated: false })
        .put(authenticationManager.actions.success({ authenticated: false }))
        .next()
        .put(products.actions.getProducts.request({}))
        .next()
        .put(marketDataManager.actions.request({}))
        .next()
        .call(action.payload.onSuccess)
        .next()
        .isDone();
    });

    it('After signout failure it dispatches failure with authenticated true', () => {
      testSaga(authenticationManager.saga, action)
        .next()
        .call(authOperation)
        .next({ success: false, authenticated: true })
        .put(authenticationManager.actions.failure({ error: true }))
        .next()
        .call(action.payload.onError, undefined)
        .next()
        .isDone();
    });
  });

  describe('STATUS', () => {
    const action = {
      payload: {
        operation: 'status',
        onSuccess: () => {},
        onError: () => {}
      }
    };

    const authOperation = authenticationManager.mapAuthOperation(
      action.payload.operation as authenticationManager.OperationType
    );

    it('After status success it dispatches success', () => {
      testSaga(authenticationManager.saga, action)
        .next()
        .call(authOperation)
        .next({ success: true, authenticated: false })
        .put(authenticationManager.actions.success({ authenticated: false }))
        .next()
        .call(action.payload.onSuccess)
        .next()
        .isDone();
    });

    it('After status failure it dispatches success', () => {
      testSaga(authenticationManager.saga, action)
        .next()
        .call(authOperation)
        .next({ success: false, authenticated: false })
        .put(authenticationManager.actions.failure({ error: true }))
        .next()
        .call(action.payload.onError, undefined)
        .next()
        .isDone();
    });
  });
});
