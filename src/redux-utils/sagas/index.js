import { all } from 'redux-saga/effects';
import photosSaga from 'redux-utils/sagas/photo';

function* rootSaga() {
  yield all([...photosSaga]);
}

export default rootSaga;
