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
    console.log('from dummy reducer');
    state.isFetching = true;
  }
});

export default reducer;
