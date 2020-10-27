// // Fixes mobile dev mode error
// import MockAdapter from 'axios-mock-adapter';
// import * as appClient from './app-client';

// describe('API client', () => {
//   appClient.init('http://base.fake.api.com', 'b7a9182');
//   const { axiosInstance } = appClient.apiInstance();

//   it('should be mocked with axios-mock-adapter', done => {
//     const mock = new MockAdapter(axiosInstance);
//     mock.onGet('/foo').reply(200, 'bar');

//     axiosInstance.get('/foo').then(response => {
//       expect(response.data).toBe('bar');
//       done();
//     });
//   });

//   it('should refresh token on the 401 response status', done => {
//     const refreshTokenMock = jest.fn();
//     appClient.setRefreshInterceptor(refreshTokenMock);
//     const mock = new MockAdapter(axiosInstance);
//     mock.onGet('/foo').reply(401);

//     axiosInstance.get('/foo').catch(() => {
//       expect(refreshTokenMock).toBeCalled();
//       done();
//     });
//   });

//   it('should not refresh token on other than 401 response statuses', done => {
//     const refreshTokenMock = jest.fn();
//     appClient.setRefreshInterceptor(refreshTokenMock);
//     const mock = new MockAdapter(axiosInstance);
//     mock.onGet('/foo').reply(404);

//     axiosInstance.get('/foo').catch(() => {
//       expect(refreshTokenMock).not.toBeCalled();
//       done();
//     });
//   });
// });
