import * as AppAuth from 'expo-app-auth';
import moment from 'moment';
import { AxiosError } from 'axios';

import * as api from './api';

import loggingService from './logging';
import storage from './storage';
import { AuthError } from './auth-error';

let AUTH_CONFIG = {
  issuer: '',
  clientId: '',
  redirectUrl: '',
  scopes: []
};

/*
  TODO This function should be a bit more clever, it's passed into the interceptor
  and used everytime a request is made calling getFromStorage on each request
  does not feel optimal. 
 */

async function getAccessToken() {
  const accessToken = await storage.encrypted.getFromStorage('accessToken');
  return accessToken || '';
}

async function getRefreshToken() {
  const refreshToken = await storage.encrypted.getFromStorage('refreshToken');
  return refreshToken || '';
}

// TODO handling errors
const revokeAccessToken = async () => {
  const accessToken = await getAccessToken();
  if (accessToken) {
    const accessTokenOptions = {
      token: accessToken,
      isClientIdProvided: true
    };
    await AppAuth.revokeAsync(AUTH_CONFIG, accessTokenOptions);
  }
};

const checkExpirationDate = async () => {
  const accessToken = await storage.getFromStorage('accessTokenExpirationDate');
  if (accessToken) {
    console.log('expiration', accessToken);
  }
};

// TODO handling errors
const revokeRefreshToken = async () => {
  const refreshToken = await getRefreshToken();
  if (refreshToken) {
    const refreshTokenOptions = {
      token: refreshToken,
      isClientIdProvided: true
    };
    await AppAuth.revokeAsync(AUTH_CONFIG, refreshTokenOptions);
  }
};

const signout = async () => {
  try {
    await revokeAccessToken();
    await revokeRefreshToken();

    api.client.removeAuth();
    loggingService.clearScope();

    await storage.removeFromStorage('idToken');
    await storage.removeFromStorage('localAuthEnabled');
    await storage.removeFromStorage('accessTokenExpirationDate');
    const keysToRemove = ['accessToken', 'refreshToken'];
    await storage.encrypted.removeFromStorage(keysToRemove);

    return { success: true, authenticated: false };
  } catch (e) {
    // Revoke failed
    const revokeTokenError = new AuthError('REVOKE_TOKEN_FAILED', e.message);
    loggingService.setError(revokeTokenError);
    return { success: false, authenticated: true, error: e.message };
  }
};

const refreshTokens = async (failedRequest: AxiosError) => {
  try {
    const refreshToken = await getRefreshToken();
    if (!refreshToken) {
      throw new Error('No refresh token present');
    }

    /*
      Using the AUTH_CONFIG here fails as it does not return all the correct audiences,
      the hunch is that as we are sending audiences there is then a bug on what is returned.
      By not sending the audience we can avoid the "bug".
     */

    const REFRESH_CONFIG = {
      issuer: '',
      clientId: '',
      redirectUrl: '',
      scopes: []
    };

    const response = await AppAuth.refreshAsync(
      REFRESH_CONFIG as AppAuth.OAuthProps,
      refreshToken as string
    );

    if (!response.accessToken || !response.refreshToken) {
      throw new Error('No access or refresh token returned');
    }

    // Update the access tokens for the failed request that triggered refreshTokens
    // @ts-ignore
    failedRequest.response.config.headers.Authorization = `Bearer ${response.accessToken}`;

    await storage.encrypted.setToStorage('accessToken', response.accessToken);
    await storage.encrypted.setToStorage('refreshToken', response.refreshToken);

    await storage.setToStorage('idToken', response.idToken);
    await storage.setToStorage(
      'accessTokenExpirationDate',
      response.accessTokenExpirationDate
    );

    return response;
  } catch (e) {
    // ERROR: Empty refresh token / Refresh token failed
    const refreshTokenError = new AuthError('REFRESH_TOKEN_FAILED', e.message);
    loggingService.setError(refreshTokenError);
    await signout();
    throw refreshTokenError;
  }
};

/*
   Checks if accessToken is stored correctly
 */

const isAuthenticated = async () => {
  try {
    const accessToken = await getAccessToken();
    return { success: true, authenticated: !!accessToken };
  } catch (e) {
    const authTokenError = new AuthError('GET_AUTH_TOKEN_FAILED', e.message);
    loggingService.setError(authTokenError);

    return { success: false, authenticated: false };
  }
};

const setLocalAuth = async (value: boolean) => {
  try {
    await storage.setToStorage('localAuthEnabled', value);
    return { success: true };
  } catch (e) {
    const localAuthSetError = new AuthError('SET_LOCAL_AUTH_FAILED', e.message);
    loggingService.setError(localAuthSetError);
    return { success: false };
  }
};

/*
   Called on app set-up to configure apiclient
   and Auth config with values from settings
 */

const init = async (authority: string, scopes: string[], clientId: string) => {
  AUTH_CONFIG = {
    issuer: authority.replace(/\/$/, ''),
    scopes,
    clientId
  };

  try {
    const accessToken = await getAccessToken();
    const refreshToken = await getRefreshToken();
    if (accessToken && refreshToken) {
      api.client.setAuthHeaderInterceptor(getAccessToken);
      api.client.setRefreshInterceptor<AppAuth.TokenResponse>(refreshTokens);
    }
  } catch (e) {
    // ERROR: Unexpected error
    const initError = new AuthError('INIT_FAILED', e.message);
    loggingService.setError(initError);
    throw initError;
  }
};

// Sets configuration for api client and saves tokens to storage.
const setupAuth = async (authResponse: AppAuth.TokenResponse) => {
  if (
    !authResponse ||
    !authResponse.accessToken ||
    !authResponse.refreshToken
  ) {
    const authFailedError = new AuthError(
      'AUTH_FAILED',
      `Bad response: ${authResponse}`
    );
    loggingService.setError(authFailedError);
    // await Updates.reloadAsync();
    return;
  }

  try {
    api.client.setAuthHeaderInterceptor(getAccessToken);
    api.client.setRefreshInterceptor<AppAuth.TokenResponse>(refreshTokens);
    await storage.encrypted.setToStorage(
      'accessToken',
      authResponse.accessToken
    );
    await storage.encrypted.setToStorage(
      'refreshToken',
      authResponse.refreshToken
    );
    await storage.setToStorage('refreshTokenSavedDate', moment().format());

    await storage.setToStorage('idToken', authResponse.idToken);
    await storage.setToStorage(
      'accessTokenExpirationDate',
      authResponse.accessTokenExpirationDate
    );
  } catch (e) {
    const setUpAuthError = new AuthError('SET_UP_AUTH_FAILURE', e.message);
    loggingService.setError(setUpAuthError);
  }
};

const signin = async () => {
  try {
    const config = {
      ...AUTH_CONFIG,
      additionalParameters: {
        page: 'signin'
      }
    };
    const response = await AppAuth.authAsync({
      ...(config as AppAuth.OAuthProps)
    });
    await setupAuth(response);
    return { success: true, authenticated: true };
  } catch (err) {
    // USER_CANCELLED has empty error code 1 on android and -3 on ios
    const code =
      err.code === '1' || err.code === '-3'
        ? 'USER_CANCELLED'
        : 'SIGNIN_FAILURE';

    return { success: false, authenticated: false, error: code };
  }
};

const signup = async () => {
  try {
    const config = {
      ...AUTH_CONFIG,
      additionalParameters: {
        page: 'signup'
      }
    };
    const response = await AppAuth.authAsync({
      ...(config as AppAuth.OAuthProps)
    });
    await setupAuth(response);
    return { success: true, authenticated: true };
  } catch (err) {
    const code =
      err.code === '1' || err.code === '-3'
        ? 'USER_CANCELLED'
        : 'SIGNUP_FAILURE';

    return { success: false, authenticated: false, error: code };
  }
};

export default {
  init,
  isAuthenticated,
  refreshTokens,
  signin,
  signup,
  signout,
  setLocalAuth,
  revokeRefreshToken,
  revokeAccessToken,
  checkExpirationDate
};
