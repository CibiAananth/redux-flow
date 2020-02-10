import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
// redux-utils
import rootReducer from 'redux-utils/reducers';
import rootSaga from 'redux-utils/sagas';
import { createLogger } from 'redux-logger';

const logger = createLogger();
const sagaMiddleware = createSagaMiddleware();
const middleware = [logger, sagaMiddleware];

const store = configureStore({
  reducer: rootReducer,
  middleware
});

sagaMiddleware.run(rootSaga);

export default store;
