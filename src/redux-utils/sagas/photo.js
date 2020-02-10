import { call, put, takeLatest } from 'redux-saga/effects';
import { photoTypes } from 'redux-utils/types';

import { get } from 'api/utils';

const watcherSaga = [takeLatest(photoTypes.getPhotos.request, getPhotosWorker)];

function* getPhotosWorker(action) {
  try {
    const { response, request, error } = yield call(get, {
      apiURL: process.env.REACT_APP_DEMO_API_GET_PHOTOS,
      params: action.payload.params
    });
    if (response) {
      yield put({
        type: photoTypes.getPhotos.success,
        payload: { response, request }
      });
      return;
    }
    yield put({
      type: photoTypes.getPhotos.error,
      payload: { error, request }
    });
  } catch (e) {
    throw new Error('error from get photo saga');
  }
}

export default watcherSaga;
