/* eslint-disable no-param-reassign */
import { createReducer } from '@reduxjs/toolkit';
import { photoTypes } from 'redux-utils/types';

const initialState = {
  isFetching: false,
  photos: {
    count: 0,
    list: []
  }
};

const reducer = createReducer(initialState, {
  [photoTypes.getPhotos.request]: state => {
    state.isFetching = true;
  },
  [photoTypes.getPhotos.success]: state => {
    state.isFetching = false;
  },
  [photoTypes.getPhotos.error]: state => {
    state.isFetching = false;
  }
});

export default reducer;
