import apisauce, { ApisauceInstance } from 'apisauce';
import { AxiosInstance } from 'axios';
import createAuthRefreshInterceptor from 'axios-auth-refresh';
import * as rax from 'retry-axios';

let api: null | ApisauceInstance = null;
let authRefreshInterceptorId: undefined | number;
let authHeaderInterceptorId: undefined | number;

const createClient = (baseURL: string) => {
  const client = apisauce.create({
    baseURL,
    timeout: 10 * 1000,
    maxRedirects: 5
  });
  rax.attach(client.axiosInstance);
  return client;
};

const init = (baseURL: string) => {
  api = createClient(baseURL);
};

const apiInstance = () => {
  if (api) {
    return api;
  }
  throw new Error('No initialised app API');
};

const raxConfig = (instance: AxiosInstance) => {
  return {
    // Retry 3 times on requests that return a response (500, etc) before giving up.  Defaults to 3.
    retry: 3,
    // Retry twice on errors that don't return a response (ENOTFOUND, ETIMEDOUT, etc).
    noResponseRetries: 2,
    // Milliseconds to delay at first.  Defaults to 100.
    retryDelay: 100,
    // HTTP methods to automatically retry.  Defaults to:
    // ['GET', 'HEAD', 'OPTIONS', 'DELETE', 'PUT']
    httpMethodsToRetry: ['GET'],
    // The response status codes to retry.  Supports a double
    // array with a list of ranges.  Defaults to:
    // [[100, 199], [429, 429], [500, 599]]
    statusCodesToRetry: [
      [100, 199],
      [429, 429],
      [500, 599]
    ],
    // If you are using a non static instance of Axios you need
    // to pass that instance here (const ax = axios.create())
    instance
    // You can detect when a retry is happening, and figure out how many
    // retry attempts have been made
    // onRetryAttempt: (err: any) => {
    //   const cfg = rax.getConfig(err);
    //   console.log(`Retry attempt #${cfg ? cfg.currentRetryAttempt : 'unknown'}`);
    // }
  };
};

const get = (url: string) => {
  const instance = apiInstance();
  return instance.get(
    url,
    {},
    { raxConfig: raxConfig(instance.axiosInstance) }
  );
};

const post = <Data>(url: string, data: Data) => {
  const instance = apiInstance();
  return instance.post(url, data, {
    raxConfig: raxConfig(instance.axiosInstance)
  });
};

const put = <Data>(url: string, data: Data) => {
  const instance = apiInstance();
  return instance.put(url, data, {
    raxConfig: raxConfig(instance.axiosInstance)
  });
};

// Note: This is only used in the dev menu to force a dodgy access token
const setAuth = (token: string) => {
  const instance = apiInstance();
  instance.setHeaders({
    Authorization: `Bearer ${token}`
  });
};

const removeAuth = () => {
  const instance = apiInstance();
  // remove interceptors for refresh and auth header
  instance.axiosInstance.interceptors.request.eject(
    authRefreshInterceptorId as number
  );
  instance.axiosInstance.interceptors.request.eject(
    authHeaderInterceptorId as number
  );
};

type TokenResponse = {
  accessToken: string | null;
};

const setAuthHeaderInterceptor = (getAccessToken: () => Promise<string>) => {
  const instance = apiInstance();
  authHeaderInterceptorId = instance.axiosInstance.interceptors.request.use(
    async request => {
      const accessToken = await getAccessToken();
      if (accessToken) {
        request.headers.Authorization = `Bearer ${accessToken}`;
      }
      return request;
    }
  );
};

const setRefreshInterceptor = <TokenHandlerResponse extends TokenResponse>(
  refreshTokenHandler: (failedRequest: any) => Promise<TokenHandlerResponse>
) => {
  const instance = apiInstance();
  authRefreshInterceptorId = createAuthRefreshInterceptor(
    instance.axiosInstance,
    refreshTokenHandler
  );
};

export {
  init,
  get,
  post,
  put,
  removeAuth,
  setRefreshInterceptor,
  apiInstance,
  setAuth,
  setAuthHeaderInterceptor
};
