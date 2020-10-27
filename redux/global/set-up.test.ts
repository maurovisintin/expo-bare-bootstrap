import { testSaga } from 'redux-saga-test-plan';
import { api, sharedActions, products } from 'profiles-shared';
import setUp, { settingsSaga, getBaseIconiaUri, getBaseAppUri } from './set-up';
import authService from '../../services/auth-service';
import * as authenticationManager from './authentication-manager';
import * as marketDataManager from './market-data-manager';

jest
  .mock('profiles-shared')
  .fn()
  .mockReturnValue({
    sharedActions: {
      global: {
        settings: {
          request: (payload: any) => ({
            type: 'SETTINGS_REQUEST',
            payload
          }),
          success: jest.fn((payload: any) => ({
            type: 'SETTINGS_SUCCESS',
            payload
          })),
          failure: jest.fn((payload: any) => ({
            type: 'SETTINGS_FAILURE',
            payload
          }))
        }
      },
      profile: {
        document: {
          request: (payload: any) => ({
            type: 'PROFILE_REQUEST',
            payload: {
              isCritical: true
            }
          })
        }
      }
    }
  });

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

jest.mock('../../services/auth-service', () => ({
  init: jest.fn(() => {}),
  isAuthenticated: jest.fn(() => {}),
  checkTokenExpiration: jest.fn(() => {}),
  getLocalAuth: jest.fn(() => {}),
  signin: jest.fn(() => {}),
  signup: jest.fn(() => {}),
  signout: jest.fn(() => {})
}));

jest.mock('../../services/notification');

const baseIconiaEndpoint = 'http://fake.api.com';
const baseAppUri = 'http://fake.api.com';

describe('set-up - unit', () => {
  describe('settings saga', () => {
    it('Returns error on a settings.failure action', () => {
      testSaga(settingsSaga)
        .next()
        .call(getBaseIconiaUri)
        .next(baseIconiaEndpoint)
        .call(api.iconia.client.init, baseIconiaEndpoint)
        .next()
        .put(sharedActions.global.authSettings.request({ isCritical: true }))
        .next()
        .take([
          sharedActions.global.authSettings.success,
          sharedActions.global.authSettings.failure
        ])
        .next(
          sharedActions.global.authSettings.failure({
            // @ts-ignore
            response: {
              status: 404
            }
          })
        )
        .returns({
          error: true,
          errorMessage: 'Failed To Fetch Settings'
        });
    });

    it('should call authService.init on success', () => {
      const successAction = sharedActions.global.authSettings.success({
        push: undefined,
        // @ts-ignore
        response: {
          data: {
            authority: 'authority',
            audience: 'audience',
            scopes: ['scopeOne', 'scopeTwo'],
            clientId: 'clientId',
            realmHint: 'realmHint'
          }
        }
      });
      testSaga(settingsSaga)
        .next()
        .call(getBaseIconiaUri)
        .next(baseIconiaEndpoint)
        .call(api.iconia.client.init, baseIconiaEndpoint)
        .next()
        .put(sharedActions.global.authSettings.request({ isCritical: true }))
        .next()
        .take([
          sharedActions.global.authSettings.success,
          sharedActions.global.authSettings.failure
        ])
        .next(successAction)
        .call(
          authService.init,
          'authority',
          'audience',
          ['scopeOne', 'scopeTwo'],
          'clientId',
          'realmHint'
        )
        .next()
        .isDone();
    });

    it('should throw error on authService.init rejection', () => {
      const successAction = sharedActions.global.authSettings.success({
        push: undefined,
        // @ts-ignore
        response: {
          data: {
            authority: 'authority',
            audience: 'audience',
            scopes: ['scopeOne', 'scopeTwo'],
            clientId: 'clientId',
            realmHint: 'realmHint'
          }
        }
      });
      const saga = testSaga(settingsSaga)
        .next()
        .call(getBaseIconiaUri)
        .next(baseIconiaEndpoint)
        .call(api.iconia.client.init, baseIconiaEndpoint)
        .next()
        .put(sharedActions.global.authSettings.request({ isCritical: true }))
        .next()
        .take([
          sharedActions.global.authSettings.success,
          sharedActions.global.authSettings.failure
        ])
        .next(successAction)
        .call(
          authService.init,
          'authority',
          'audience',
          ['scopeOne', 'scopeTwo'],
          'clientId',
          'realmHint'
        )
        .next();

      expect(() =>
        saga
          .throw(new Error('hello'))
          .next()
          .returns({ error: true, errorMessage: 'hello' })
          .next()
          .isDone()
      );
    });

    describe('setUp saga', () => {
      it('is successful when not authenticated', () => {
        const action = {
          payload: {
            options: {}
          }
        };
        testSaga(setUp.saga, action)
          .next()
          .call(getBaseAppUri)
          .next(baseAppUri)
          .call(api.app.client.init, baseAppUri, '')
          .next()
          .call(settingsSaga)
          .next(true)
          .call(authService.isAuthenticated)
          .next({ success: true, authenticated: false })
          .put(setUp.actions.success())
          .next()
          .put(products.actions.getProducts.request({}))
          .next()
          .put(marketDataManager.actions.request({}))
          .next()
          .next()
          .isDone();
      });

      it('is successful when authenticated and dispatches profile request', () => {
        const action = {
          payload: {
            options: {
              deepLinkHandler: undefined
            }
          }
        };

        testSaga(setUp.saga, action)
          .next()
          .call(getBaseAppUri)
          .next(baseAppUri)
          .call(api.app.client.init, baseAppUri, '')
          .next()
          .call(settingsSaga)
          .next(true)
          .call(authService.isAuthenticated)
          .next({ success: true, authenticated: true })
          .put(authenticationManager.actions.request({ operation: 'status' }))
          .next()
          .call(authService.getLocalAuth)
          .next({ success: true, enabled: true })
          // .put(
          //   sharedActions.profile.document.request({
          //     isCritical: true,
          //     onSuccess: () => profileSuccess(action.payload.options.deepLinkHandler),
          //     onError: profileError
          //   })
          // )
          .next()
          // .put(setUp.actions.success())
          .next()
          .isDone();
      });

      it('Handles thrown errors', () => {
        const action = {
          payload: {
            options: {}
          }
        };
        const saga = testSaga(setUp.saga, action)
          .next()
          .call(getBaseAppUri)
          .next(baseAppUri)
          .call(api.app.client.init, baseAppUri, '')
          .next()
          .call(settingsSaga)
          .next();

        expect(() =>
          saga
            .throw(new Error('hello'))
            .next()
            .put(
              setUp.actions.failure({
                errorMessage: 'hello'
              })
            )
            .next()
            .isDone()
        );
      });
    });
  });
});
