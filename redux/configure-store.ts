/* eslint-disable global-require */
import { applyMiddleware, createStore, Reducer } from 'redux';
import createSagaMiddleware, { Saga } from 'redux-saga';

export default <RootReducer, RootSaga>(
  rootReducer: Reducer,
  rootSaga: Saga,
  middleware?: any
) => {
  const middlewares = [...middleware];

  const sagaMiddleware = createSagaMiddleware();
  middlewares.push(sagaMiddleware);

  // eslint-disable-next-line no-undef
  if (__DEV__) {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const { logger } = require(`redux-logger`);

    middlewares.push(logger);
  }

  const store = createStore(rootReducer, applyMiddleware(...middlewares));

  sagaMiddleware.run(rootSaga);

  return store;
};
